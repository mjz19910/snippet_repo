import {attached_proxy_arr} from "./attached_proxy_arr.js";
import {attach_event_target_add_event_listener_proxy} from "./attach_event_target_add_event_listener_proxy.js";
import {attach_promise_then_proxy} from "./attach_promise_then_proxy.js";
import {attach_request_animation_frame_proxy} from "./attach_request_animation_frame_proxy.js";
import {attach_string_index_of_proxy} from "./attach_string_index_of_proxy.js";

declare global {
	interface Window {
		attached_proxy_arr: ((...args: any[]) => any)[];
	}
}

export function script_registry_main() {
	window.attached_proxy_arr=attached_proxy_arr;
	attach_event_target_add_event_listener_proxy();
	attach_request_animation_frame_proxy();
	attach_promise_then_proxy();
	attach_string_index_of_proxy();
}
