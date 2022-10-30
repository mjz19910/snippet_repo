import {json_parse_handler} from "./json_parse_handler"

export function init_JSON_parse_plugin() {
	let Function_any: any=Function
	let Function_with_json_info: {JSON_parse_changed?: boolean}=Function_any
	if(Function_with_json_info.JSON_parse_changed===undefined) {
		let orig_json_parse=JSON.parse
		JSON.parse=new Proxy(JSON.parse,new json_parse_handler)
		JSON.parse=orig_json_parse
		Function_with_json_info.JSON_parse_changed=true
	}
}
