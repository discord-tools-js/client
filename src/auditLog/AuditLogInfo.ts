import {RawAuditEntryInfo} from "../rest/RawData";
import Client from "../Client";

class AuditLogInfo {
    deleteMemberDays: number;
    membersRemoved: number;
    channelID: string;
    messageID: string;
    count: number;
    id: string;
    type: "0" | "1";
    roleName: string;
    client: Client;

    constructor(client: Client, data: RawAuditEntryInfo) {
        this.deleteMemberDays = parseInt(data.delete_member_days);
        this.membersRemoved = parseInt(data.members_removed);
        this.channelID = data.channel_id;
        this.messageID = data.message_id;
        this.count = parseInt(data.count);
        this.id = data.id;
        this.type = data.type;
        this.roleName = data.role_name;
    }
}

export default AuditLogInfo;