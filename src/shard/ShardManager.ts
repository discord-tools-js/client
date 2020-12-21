import {spawn} from "child_process";
import {join} from "path";

import RESTManager from "../rest/RESTManager";

class ShardManager {
    token: string;
    filePath: string;
    rest: RESTManager;

    constructor(token: string, filePath: string) {
        this.token = token;
        this.filePath = filePath;
        this.rest = new RESTManager(token);
    }

    spawn(id: number, count: number, url: string): void {
        spawn("node", [join(__dirname, this.filePath)], {
            stdio: "inherit",
            env: Object.assign({
                DISCORD_TOKEN: this.token,
                SHARD_ID: id,
                SHARD_COUNT: count,
                GATEWAY_URL: url
            }, process.env)
        }).on("end", () => this.spawn(id, count, url));
    }

    async start(): Promise<void> {
        const gatewayInformation = await this.rest.getGatewayBot();
        for (let i = 0; i < gatewayInformation.shards; i++) {
            this.spawn(i, gatewayInformation.shards, gatewayInformation.url);
        }
    }
}

export default ShardManager;