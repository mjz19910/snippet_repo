import {ScriptStateHost} from "types/ScriptStateHost";
import {rebuild_auto_main} from "types/main";
import {TimerApi} from "types/TimerApi.js";
export const cint_arr: string[] = [];
export let g_timer_api = new TimerApi;
export let message_types = g_timer_api.msg_types;
export var is_in_ignored_from_src_fn = {flag:false};
export var is_in_userscript_fn = {flag:false};
export var is_in_userscript = {flag:true};
export let cur_event_fns: (CallableFunction | NewableFunction)[] = [];
export let seen_elements = new WeakSet;
export default function entry_point() {
	rebuild_auto_main();
	ScriptStateHost.event_target.dispatchEvent({type: 'userscript', state: 'done'});
}
