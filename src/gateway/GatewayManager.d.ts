/// <reference types="node" />
import * as WebSocket from "ws";
import { Inflate } from "zlib-sync";
import { EventEmitter } from "events";
import { URL } from "url";
declare type Packet = {
    op: number;
    d?: any;
    t?: string;
    s?: number;
};
declare class GatewayManager extends EventEmitter {
    token: string;
    intents: number;
    gatewayURL: URL;
    inflate: Inflate;
    seq: number;
    sessionID: string;
    resuming: boolean;
    socket: WebSocket;
    heartbeatInterval: NodeJS.Timeout;
    hasRecievedACK: boolean;
    constructor(token: string, intents: number);
    login(resume?: boolean): void;
    onPacket(data: any): void;
    onDispatch(packet: Packet): void;
    onReconnect(packet: Packet): void;
    onInvalidSession(packet: Packet): void;
    onHello(packet: Packet): void;
    onHeartbeatACK(packet: Packet): void;
    heartbeat(): void;
    identify(): void;
    resume(): void;
    disconnect(resume?: boolean): void;
}
export default GatewayManager;
