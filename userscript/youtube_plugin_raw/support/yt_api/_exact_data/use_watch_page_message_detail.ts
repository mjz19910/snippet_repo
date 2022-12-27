import * as json from "./json/page_type_watch_detail.json";
import {use_page_load_response} from "./use_page_load_response";

export function use_watch_page_message_detail(json_arg: typeof json) {
	type Json=typeof json;
	type json_d=keyof Json;
	use_page_load_response(json_arg.response);
	type XX={
		a: {
			[U in json_d]: Json[U];
		};
	};
	return [
		class implements XX {a=json_arg;},
	] as {}[];
}
