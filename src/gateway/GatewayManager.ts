import {pack, unpack} from "erlpack";
import * as WebSocket from "ws";
import {Inflate, Z_SYNC_FLUSH} from "zlib-sync";

import {EventEmitter} from "events";
import {URL} from "url";

import {name} from "../../package.json";

type Packet = {op: number, d?: any, t?: string, s?: number}

class GatewayManager extends EventEmitter {
    token: string;
    intents: number;
    gatewayURL: URL;
    inflate: Inflate;
    seq: number;
    sessionID: string;
    resuming = false;
    socket: WebSocket;
    heartbeatInterval: NodeJS.Timeout;
    hasRecievedACK = true;

    constructor(token: string = process.env.DISCORD_TOKEN, intents: number) {
        super();

        this.token = token;
        this.intents = intents;

        this.inflate = new Inflate({
            chunkSize: 65535
        });

        const url = new URL(process.env.GATEWAY_URL);
        url.searchParams.set("v", "8");
        url.searchParams.set("encoding", "etf");
        url.searchParams.set("compress", "zlib-stream");
        this.gatewayURL = url;
    }

    login(resume = false): void {
        this.socket = new WebSocket(this.gatewayURL);
        this.resuming = resume && !!this.seq && !!this.sessionID;

        this.socket.on("message", this.onPacket.bind(this));
    }

    onPacket(data: any) {
        if (data instanceof ArrayBuffer) data = new Uint8Array(data);
        const flush = data.length >= 4 && data[data.length - 4] === 0x00 && data[data.length - 3] === 0x00 && data[data.length - 2] === 0xff && data[data.length - 1] === 0xff;
        this.inflate.push(data, flush && Z_SYNC_FLUSH);
        if (!flush) return;
        data = this.inflate.result;
        if (!Buffer.isBuffer(data)) data = Buffer.from(new Uint8Array(data));
        if (data.length === 0) return;

        const packet: Packet = unpack(data);
        switch (packet.op) {
            case 0:
                this.onDispatch(packet);
                break;
            case 7:
                this.onReconnect(packet);
                break;
            case 9:
                this.onInvalidSession(packet);
                break;
            case 10:
                this.onHello(packet);
                break;
            case 11:
                this.onHeartbeatACK(packet);
                break;
        }
    }

    onDispatch(packet: Packet) {
        this.emit(packet.t, packet.d);
        this.seq = packet.s;
        if (packet.t === "READY") this.sessionID = packet.d.session_id;
    }

    onReconnect(packet: Packet) {
        this.emit("RECONNECT");
        this.disconnect(true);
        this.login(true);
    }

    onInvalidSession(packet: Packet) {
        this.emit("INVALID_SESSION", packet.d);
        this.disconnect(packet.d);
        this.login(packet.d);
    }

    onHello(packet: Packet) {
        this.emit("HELLO", packet.d);
        this.heartbeatInterval = setInterval(this.heartbeat.bind(this), packet.d.heartbeat_interval);
        if (this.resuming) {
            this.resume();
        } else {
            this.identify();
        }
    }

    onHeartbeatACK(packet: Packet) {
        this.emit("HEARTBEAT_ACK");
        this.hasRecievedACK = true;
    }

    heartbeat() {
        if (this.hasRecievedACK) {
            this.hasRecievedACK = false;
            this.socket.send(pack({
                op: 1,
                d: this.seq || null
            }));
        } else {
            this.disconnect(true);
            this.login(true);
        }
    }

    identify() {
        this.socket.send(pack({
            op: 2,
            d: {
                token: this.token,
                properties: {
                    $os: process.platform,
                    $browser: name,
                    $device: name
                },
                compress: true,
                shard: [parseInt(process.env.SHARD_ID || "0"), parseInt(process.env.SHARD_COUNT || "1")],
                intents: this.intents
            }
        }));
    }

    resume() {
        this.resuming = false;
        this.socket.send(pack({
            token: this.token,
            session_id: this.sessionID,
            seq: this.seq
        }));
    }

    disconnect(resume = false) {
        this.socket.close(4000);
        clearInterval(this.heartbeatInterval);
        this.heartbeatInterval = null;
        this.socket = null;
        if (!resume) {
            this.seq = null;
            this.sessionID = null;
        }
    }
}

export default GatewayManager;