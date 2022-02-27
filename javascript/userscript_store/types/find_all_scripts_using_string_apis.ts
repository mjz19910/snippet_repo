import {cur_event_fns} from "../typed_mod_rebuild_auto";
import {WeakFinalInfo} from "./WeakFinalInfo";
import {TokenType} from "./TokenType";
import {replace_cb_with_safe_proxy} from "./replace_cb_with_safe_proxy";
import {str_index_of_inject} from "./str_index_of_inject";
import {CleanupType} from "./CleanupType";
import {HeldType} from "./HeldType";
export var is_in_userscript:{flag:boolean}={flag:false};
export var is_in_ignored_from_src_fn:{flag:boolean}={flag:false};
export let scripts = new WeakSet;
export let scripts_holders:HeldType[] = [];
export let scripts_tokens: (TokenType | null)[] = [];
export let scripts_weak_arr: (WeakFinalInfo | null)[] = [];
class Counter {
	id=0;
	inc(){
		this.id++;
	}
}
export let script_id = new Counter;
export let script_registry:FinalizationRegistry<{}> = new FinalizationRegistry(function cleanup(held: CleanupType) {
	let arr_key = held.arr_key;
	let weak_state_index = scripts_weak_arr.findIndex(e => e && e.key === arr_key);
	let token_index = scripts_tokens.findIndex(e => e && e.key === arr_key);
	if(weak_state_index === -1) {
		console.log('prev gc', held);
	}
	let token = null;
	let weak_state = null;
	if(token_index > -1)
		token = scripts_tokens[token_index];
	if(weak_state_index > -1)
		weak_state = scripts_weak_arr[weak_state_index];
	console.log('gc', weak_state_index, token_index, arr_key, token, weak_state);
	scripts_weak_arr[weak_state_index] = null;
	scripts_tokens[token_index] = null;
});
export function module_init(){
	EventTarget.prototype.addEventListener = new Proxy(EventTarget.prototype.addEventListener, {
		apply(...a): any {
			// this will always be EventTarget.prototype.addEventListener (the real one)
			// let target_fn=a[0];
			cur_event_fns.push(a[0]);
			let idx = cur_event_fns.indexOf(a[0]);
			let target_obj = a[1];
			let call_args = a[2];
			replace_cb_with_safe_proxy(call_args, 1);
			// ignore any calls from this script
			if(!is_in_userscript) {
				debugger;
				console.log(target_obj, call_args);
			}
			let ret;
			try {
				ret = Reflect.apply(...a);
			} finally {
				delete cur_event_fns[idx];
			}
			delete cur_event_fns[idx];
			return ret;
		}
	});
	window.requestAnimationFrame = new Proxy(requestAnimationFrame, {
		apply(...a) {
			// let target_obj = a[1];
			let call_args = a[2];
			replace_cb_with_safe_proxy(call_args, 0);
			return Reflect.apply(...a);
		}
	});
	window.proxy_set = [];
	window.proxy_set.push(EventTarget.prototype.addEventListener);
	Promise.prototype.then = new Proxy(Promise.prototype.then, {
		apply(...a) {
			// let target_obj = a[1];
			let call_args = a[2];
			replace_cb_with_safe_proxy(call_args, 0);
			replace_cb_with_safe_proxy(call_args, 1);
			return Reflect.apply(...a);
		}
	});
	String.prototype.indexOf = new Proxy(String.prototype.indexOf, {
		apply(...a) {
			str_index_of_inject();
			return Reflect.apply(...a);
		}
	});
}