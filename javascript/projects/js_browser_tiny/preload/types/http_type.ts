import {ClientRequest, IncomingMessage} from "http";
import {RequestOptions} from "https";
export type http_type = {
	get(options: RequestOptions | string | URL, callback?: (res: IncomingMessage) => void): ClientRequest;
	get(url: string | URL, options: RequestOptions, callback?: (res: IncomingMessage) => void): ClientRequest;
}
