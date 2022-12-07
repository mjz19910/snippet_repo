import {GApiType} from "./GApiType.js";

declare global {
	interface Window {
		g_api?: Partial<GlobalApiObject>;
	}
}

export function init_g_api() {
	window.g_api??=GApiType.create();
}
