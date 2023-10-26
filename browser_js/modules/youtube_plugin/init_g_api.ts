import {GApiType} from "./GApiType.ts";

declare global {
	interface Window {
		g_api: ReturnType<GApiType['create']>;
	}
}
