import {YtPlayerApi} from "./YtPlayerApi";

export class YtPlayerApiResolver {
	promise: Promise<YtPlayerApi>;
	constructor() {
		this.promise=Promise.resolve({} as YtPlayerApi);
	}
}
