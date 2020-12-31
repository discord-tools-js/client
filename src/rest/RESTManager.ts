import {request} from "https";
import {join} from "path";
import {URL} from "url";

import {version, homepage} from "../../package.json";
import AuditLogEvent from "../auditLog/AuditLogEvent";
import {RawGetGatewayBotResponse, RawAuditLog, RawChannel, RawChannelOverwrite, RawMessage} from "./RawData";

class RESTManager {
    token: string;

    constructor(token: string) {
        this.token = token;
    }

    request(path: string, method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS" = "GET", headers: object = {}, body?: object): Promise<any> {
        return new Promise((resolve, reject) => {
            let rawBody: string;
            if (typeof body !== "undefined") {
                rawBody = JSON.stringify(body);
                Object.assign(headers, {
                    "content-type": "application/json",
                    "content-length": Buffer.byteLength(rawBody)
                });
            }
            const req = request(new URL(join("api/v8", path), "https://discord.com"), {
                method,
                headers: Object.assign(headers, {
                    authorization: `Bot ${this.token}`,
                    "user-agent": `DiscordBot (${homepage}, ${version})`
                })
            }, function(res) {
                let data = "";
                res.on("error", reject);
                res.on("data", chunk => data += chunk);
                res.on("end", () => resolve(JSON.parse(data)));
            });
            req.on("error", reject);
            if (rawBody) req.write(rawBody);
            req.end();
        });
    }

    getGatewayBot(): Promise<RawGetGatewayBotResponse> {
        return this.request("/gateway/bot");
    }

    getGuildAuditLog(guildID: string, options?: {user_id?: string, action_type?: AuditLogEvent, before?: string, limit?: number}): Promise<RawAuditLog> {
        let url = new URL(`https://discord.com/api/v8/guilds/${guildID}/audit-logs`);
        if (options) {
            for (let key in options) {
                url.searchParams.set(key, options[key]);
            }
        }
        return this.request(url.pathname + url.search);
    }

    getChannel(channelID: string): Promise<RawChannel> {
        return this.request(`/channels/${channelID}`);
    }

    modifyChannel(channelID: string, options: {name?: string, type?: 0 | 5, position?: number | null, topic?: string | null, nsfw?: boolean | null, rate_limit_per_user?: number | null, bitrate?: number | null, user_limit?: number | null, permission_overwrites?: RawChannelOverwrite[] | null, parent_id?: string | null}): Promise<RawChannel> {
        return this.request(`/channels/${channelID}`, "PATCH", {}, options);
    }

    deleteChannel(channelID: string): Promise<RawChannel> {
        return this.request(`/channels/${channelID}`, "DELETE");
    }

    getChannelMessages(channelID: string, options?: {around?: string, before?: string, after?: string, limit?: number}): Promise<RawMessage[]> {
        let url = new URL(`https://discord.com/api/v8/channels/${channelID}/messages`);
        if (options) {
            for (let key in options) {
                url.searchParams.set(key, options[key]);
            }
        }
        return this.request(url.pathname + url.search);
    }

    getChannelMessage(channelID: string, messageID: string): Promise<RawMessage> {
        return this.request(`/channels/${channelID}/messages/${messageID}`);
    }


}

export default RESTManager;