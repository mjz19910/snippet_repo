import {GApiType} from "./GApiType.js";

declare global {
	interface Window {
		g_api: ReturnType<GApiType['create']>;
	}
}
