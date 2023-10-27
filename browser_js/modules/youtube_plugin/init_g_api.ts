import {GApiType} from "./GApiType.ts";

declare global {
	export interface Window {
		g_api: ReturnType<GApiType['create']>;
	}
}
