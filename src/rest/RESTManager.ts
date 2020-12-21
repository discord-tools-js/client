import {request} from "https";
import {URL} from "url";

import {version, homepage} from "../../package.json";

class RESTManager {
    token: string;

    constructor(token: string) {
        this.token = token;
    }

    request(path: string, method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS" = "GET", headers: object = {}, body?: object): Promise<object> {
        return new Promise((resolve, reject) => {
            let rawBody: string;
            if (typeof body !== "undefined") {
                rawBody = JSON.stringify(body);
                Object.assign(headers, {
                    "content-type": "application/json",
                    "content-length": Buffer.byteLength(rawBody)
                });
            }
            const req = request(new URL(path, "https://discord.com/api/v8"), {
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

    getGatewayBot(): Promise<{url: string, shards: number, session_start_limit: {total: number, remaining: number, reset_after: number, max_concurrency: number}}> {
        return this.request("/gateway/bot");
    }
}

export default RESTManager;