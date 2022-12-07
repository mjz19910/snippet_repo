import {GApiType} from "./GApiType.js";

declare global {
	interface Window {
		g_api?: GlobalApiObject;
	}
}

export function init_g_api() {
	window.g_api??=GApiType.create();
}
