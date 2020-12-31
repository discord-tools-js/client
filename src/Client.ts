import {EventEmitter} from "events";
import RESTManager from "./rest/RESTManager";
import GatewayManager from "./gateway/GatewayManager";
import Intent from "./gateway/Intent";

class Client extends EventEmitter {
    token: string;
    rest: RESTManager;
    gateway: GatewayManager;
    intents: Intent[];

    constructor(token: string = process.env.DISCORD_TOKEN, intents: Intent[]) {
        super();
        this.token = token;
        this.intents = intents;
        this.rest = new RESTManager(token);
        this.gateway = new GatewayManager(token, intents.reduce((a, b) => a | b));
    }

    login() {
        this.gateway.login();
    }
}

export default Client;