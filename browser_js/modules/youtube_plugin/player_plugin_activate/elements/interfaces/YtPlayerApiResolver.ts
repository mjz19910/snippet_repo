import { YtPlayerApi } from "./YtPlayerApi.ts";

export interface YtPlayerApiResolver {
	promise: Promise<YtPlayerApi>;
}
