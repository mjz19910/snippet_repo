import {json_parse_handler} from "./json_parse_handler.js";

declare global {
	interface Window {
		json_parse_changed?: boolean;
	}
}

export function init_json_parse_plugin() {
	if(window.json_parse_changed===undefined) {
		let orig_json_parse=JSON.parse;
		JSON.parse=new Proxy(JSON.parse,new json_parse_handler);
		JSON.parse=orig_json_parse;
		window.json_parse_changed=true;
	}
}
