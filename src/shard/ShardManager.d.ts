import RESTManager from "../rest/RESTManager";
declare class ShardManager {
    token: string;
    filePath: string;
    rest: RESTManager;
    constructor(token: string, filePath: string);
    spawn(id: number, count: number, url: string): void;
    start(): Promise<void>;
}
export default ShardManager;
