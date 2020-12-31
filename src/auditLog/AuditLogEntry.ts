import AuditLogChange from "./AuditLogChange";
import AuditLogEvent from "./AuditLogEvent";
import AuditLogInfo from "./AuditLogInfo";
import Client from "../Client";
import {RawAuditLogEntry} from "../rest/RawData";

class AuditLogEntry {
    targetID: string | null;
    changes: Map<string, AuditLogChange> = new Map();
    userID: string;
    id: string;
    type: AuditLogEvent;
    info: AuditLogInfo;
    reason?: string;
    client: Client;

    constructor(client: Client, data: RawAuditLogEntry) {
        this.client = client;
        this.targetID = data.target_id;
        data.changes.forEach(change => this.changes.set(change.key, new AuditLogChange(client, change)));
        this.userID = data.user_id;
        this.id = data.id;
        this.type = data.action_type;
        this.info = new AuditLogInfo(client, data.options);
        this.reason = data.reason;
    }
}

export default AuditLogEntry;