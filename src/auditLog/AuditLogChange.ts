import AuditLogChangeKey from "./AuditLogChangeKey";
import {RawAuditLogChange} from "../rest/RawData";
import Client from "../Client";

class AuditLogChange {
    key: AuditLogChangeKey;
    oldValue?: string | number | boolean | Role[] | PermissionOverwrite[];
    newValue?: string | number | boolean | Role[] | PermissionOverwrite[];
    client: Client;

    constructor(client: Client, data: RawAuditLogChange) {
        this.client = client;
        this.key = data.key;
        if (data.old_value instanceof Array && data.new_value instanceof Array) {
            // TODO
        } else {
            this.oldValue = data.old_value;
            this.newValue = data.new_value;
        }
    }
}

export default AuditLogChange;