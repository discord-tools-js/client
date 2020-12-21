import {pack, unpack} from "erlpack";
import * as WebSocket from "ws";
import {Inflate, Z_SYNC_FLUSH} from "zlib-sync";

import {EventEmitter} from "events";
import {URL} from "url";

class GatewayManager extends EventEmitter {
    token: string;
    intents: number;
    gatewayURL: URL;
    inflate: Inflate;
    seq: number;
    sessionID: string;
    resuming: boolean;
    socket: WebSocket;

    constructor(token: string, intents: number) {
        super();

        this.token = token;
        this.intents = intents;

        this.inflate = new Inflate({
            chunkSize: 65535,
            flush: Z_SYNC_FLUSH
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

        const packet: {op: 0 | 7 | 9 | 10 | 11, d: any, t: string | null, s: number | null} = unpack(data);
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

    onDispatch(packet: {op: 0, d: any, t: string, s: number}) {
        this.emit(packet.t, packet.d);
        this.seq = packet.s;
    }

    onReconnect(packet: {op: 7}) {
        this.emit("RECONNECT");
    }

    onInvalidSession(packet: {op: 9, d: boolean}) {
        this.emit("INVALID_SESSION", packet.d);
    }

    onHello(packet: {op: 10, d: {}}) {

    }
}

export default GatewayManager;