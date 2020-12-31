declare class RESTManager {
    token: string;
    constructor(token: string);
    request(path: string, method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS", headers?: object, body?: object): Promise<any>;
    getGatewayBot(): Promise<{
        url: string;
        shards: number;
        session_start_limit: {
            total: number;
            remaining: number;
            reset_after: number;
            max_concurrency: number;
        };
    }>;
}
export default RESTManager;
