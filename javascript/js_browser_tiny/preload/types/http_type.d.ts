/// <reference types="node" />
import { RequestOptions, IncomingMessage, ClientRequest } from "http";
export declare type http_type = {
    get(options: RequestOptions | string | URL, callback?: (res: IncomingMessage) => void): ClientRequest;
    get(url: string | URL, options: RequestOptions, callback?: (res: IncomingMessage) => void): ClientRequest;
};
