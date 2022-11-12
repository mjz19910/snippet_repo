import {attach_event_target_add_event_listener_proxy} from "./attach_event_target_add_event_listener_proxy.js";
import {attach_promise_then_proxy} from "./attach_promise_then_proxy.js";
import {attach_request_animation_frame_proxy} from "./attach_request_animation_frame_proxy.js";
import {attach_string_index_of_proxy} from "./attach_string_index_of_proxy.js";
import {attached_proxy_arr} from "./mod.js";

declare global {
	// script_registry/main.ts
	interface Window {
		proxy_set: ((...args: any[]) => any)[];
	}
}

export function main() {
	window.proxy_set=attached_proxy_arr;
	attach_event_target_add_event_listener_proxy();
	attach_request_animation_frame_proxy();
	attach_promise_then_proxy();
	attach_string_index_of_proxy();
}
