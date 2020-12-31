import AuditLogEntry from "./AuditLogEntry";
import Client from "../Client";
import {RawAuditLog} from "../rest/RawData";

class AuditLog {
    webhooks: Map<string, Webhook> = new Map();
    users: Map<string, User> = new Map();
    entries: Map<string, AuditLogEntry> = new Map();
    integrations: Map<string, Integration> = new Map();
    client: Client;

    constructor(client: Client, data: RawAuditLog) {
        this.client = client;
        data.entries.forEach(entry => this.entries.set(entry.id, new AuditLogEntry(client, entry)));
    }
}

export default AuditLog;