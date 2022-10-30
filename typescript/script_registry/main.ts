import {attach_event_target_add_event_listener_proxy} from "./attach_event_target_add_event_listener_proxy"
import {attach_promise_then_proxy} from "./attach_promise_then_proxy"
import {attach_request_animation_frame_proxy} from "./attach_request_animation_frame_proxy"
import {attach_string_index_of_proxy} from "./attach_string_index_of_proxy"
import {attached_proxy_arr} from "./mod"

export function main() {
	window.proxy_set=attached_proxy_arr
	attach_event_target_add_event_listener_proxy()
	attach_request_animation_frame_proxy()
	attach_promise_then_proxy()
	attach_string_index_of_proxy()
}
