import {SymbolRef} from "./types/SymbolRef";
import {AutoBuy} from "./types/AutoBuy";
import {ProxyHandlers} from "./types/ProxyHandlers";
import {ScriptStateHost} from "./types/ScriptStateHost";
import {find_all_scripts_using_string_apis} from "./types/find_all_scripts_using_string_apis_helper";
import {DocumentWriteList} from "./types/DocumentWriteList";
import {UniqueIdGenerator} from "./types/UniqueIdGenerator";
import {move_timers_to_worker_promise_executor} from "types/move_timers_to_worker_promise_executor";
import {TimerApi} from "types/TimerApi";
import {remove_bad_dom_script_element} from "./remove_bad_dom_script_element";
import {SimpleStackVMParser} from "./SimpleStackVMParser";
import {calc_ratio} from "./calc_ratio";
import {WorkerAsyncMessageTy} from "./WorkerAsyncMessageTy";
import {TimeoutFireSTy} from "./TimeoutFireSTy";
import {TimeoutFireRTy} from "./TimeoutFireRTy";
import {WorkerUpdateMessageHandlerTy} from "./WorkerUpdateMessageHandlerTy";
import {TimeoutMessageRTy} from "./TimeoutMessageRTy";
import {TimeoutSetSTy} from "./TimeoutSetSTy";
import {TimeoutSetRTy} from "./TimeoutSetRTy";
import {TimeoutClearSTy} from "./TimeoutClearSTy";
import {TimeoutClearRTy} from "./TimeoutClearRTy";
import {TimeoutClearATy} from "./TimeoutClearATy";
import {WorkerDestroyMessageTy} from "./WorkerDestroyMessageTy";
import {WorkerUpdateMessageHandlerReplyTy} from "./WorkerUpdateMessageHandlerReplyTy";
import {WorkerReadyReplyTy} from "./WorkerReadyReplyTy";
import {ReplySetSingleTy} from "./ReplySetSingleTy";
import {ReplySetRepeatingTy} from "./ReplySetRepeatingTy";
import {ReplyClearSingleTy} from "./ReplyClearSingleTy";
import {ReplyClearRepeatingTy} from "./ReplyClearRepeatingTy";
import {ReplyClearAnyTy} from "./ReplyClearAnyTy";
import {ReplyMessage1Ty} from "./ReplyMessage1Ty";
import {ReplyMessage2Ty} from "./ReplyMessage2Ty";
import {ReplyFromWorkerTy} from "./ReplyFromWorkerTy";

export const TIMER_SINGLE = 1;
export const TIMER_REPEATING = 2;
export const TIMER_TAG_COUNT = 3;
export const AUDIO_ELEMENT_VOLUME = 0.58;
const cint_arr: string[] = [];
export const WorkerAsyncMessage = 1;
export const TimeoutFireS = 101;
export const TimeoutFireR = 102;
export const WorkerUpdateMessageHandler = 201;
export const TimeoutMessageR = 202;
export const TimeoutSetS = 203;
export const TimeoutSetR = 204;
export const TimeoutClearS = 205;
export const TimeoutClearR = 206;
export const TimeoutClearA = 207;
export const WorkerDestroyMessage = 300;
export const WorkerUpdateMessageHandlerReply = 301;
export const WorkerReadyReply = 302;
export const ReplySetSingle = 303;
export const ReplySetRepeating = 304;
export const ReplyClearSingle = 305;
export const ReplyClearRepeating = 306;
export const ReplyClearAny = 307;
export const ReplyMessage1 = 401;
export const ReplyMessage2 = 402;
export const ReplyFromWorker = 500;
const ReplyToWorker = 600;
export type ReplyToWorkerTy = typeof ReplyToWorker;
const TimeoutSingleReply = 700;
export type TimeoutSingleReplyTy = typeof TimeoutSingleReply;
const TimeoutRepeatingReply = 701;
export type TimeoutRepeatingReplyTy = typeof TimeoutRepeatingReply;
export const TimeoutSetTypes = 1001;
export type TimeoutSetTypesTy = typeof TimeoutSetTypes;
export const TimeoutSetStringS = "setTimeout";
export const TimeoutSetStringR = "setInterval";
export const TimeoutClearStringS = "clearTimeout";
export const TimeoutClearStringR = "clearInterval";
export type WorkerReplyTypesTy = {
	single: TimeoutSingleReplyTy;
	repeating: TimeoutRepeatingReplyTy;
};
type ReplyClearTypes = {
	single: ReplyClearSingleTy;
	repeating: ReplyClearRepeatingTy;
	any: ReplyClearAnyTy;
};
type ReplySetTypes = {
	single: ReplySetSingleTy;
	repeating: ReplySetRepeatingTy;
};
export type TimeoutFireInfoTy = {
	single: TimeoutFireSTy;
	repeating: TimeoutFireRTy;
};
type TimeoutSetInfoTy = {
	single: TimeoutSetSTy;
	repeating: TimeoutSetRTy;
};
type TimeoutClearInfoTy = {
	single: TimeoutClearSTy;
	repeating: TimeoutClearRTy;
	any: TimeoutClearATy;
};
export type TimeoutWorkerTypesTy = {
	reply: WorkerReplyTypes;
	update_message_handler: WorkerUpdateMessageHandlerTy;
	ready: TimeoutMessageRTy;
	set: TimeoutSetInfoTy;
	clear: TimeoutClearInfoTy;
	set_types: TimeoutSetTypesTy;
};
export type TimerMessageTypesTy = {
	async: WorkerAsyncMessageTy;
	reply: ReplyTypes;
	fire: TimeoutFireInfoTy;
	worker: TimeoutWorkerTypesTy;
};
export type TimeoutSetStringsTy = {
	single: typeof TimeoutSetStringS;
	repeating: typeof TimeoutSetStringR;
};
export type TimeoutClearStringsTy = {
	single: typeof TimeoutClearStringS;
	repeating: typeof TimeoutClearStringR;
};
type VarRef = {
	var: string;
};
type RefVarInfo = {
	t: number;
	v: VarRef;
};
export type RefVarMsg = {
	t: number;
	v: RefVarInfo;
};
type NumInfo = {
	t: number;
	v: number;
};
export type NumInfoMsg = {
	t: number;
	v: NumInfo;
};
export type NoDataMsg = {
	t: number;
};
export type LocalOrRemoteIdVarType = {
	var: 'local_id' | 'remote_id';
};
export type MakeReplyDataType = {
	t: number;
	v: LocalOrRemoteIdVarType | number;
};
class WorkerFireReplyTypes implements WorkerReplyTypesTy {
	single: TimeoutSingleReplyTy = TimeoutSingleReply
	repeating: TimeoutRepeatingReplyTy = TimeoutRepeatingReply
}
class WorkerReplyTypes {
	fire = new WorkerFireReplyTypes;
}
class ReplySetMessages implements ReplySetTypes {
	single: ReplySetSingleTy = ReplySetSingle
	repeating: ReplySetRepeatingTy = ReplySetRepeating
};
class ReplyClearMessages implements ReplyClearTypes {
	single: ReplyClearSingleTy = ReplyClearSingle
	repeating: ReplyClearRepeatingTy = ReplyClearRepeating
	any: ReplyClearAnyTy = ReplyClearAny
}
class ReplyTypes {
	msg1: ReplyMessage1Ty = ReplyMessage1;
	msg2: ReplyMessage2Ty = ReplyMessage2;
	from_worker: ReplyFromWorkerTy = ReplyFromWorker;
	to_worker: ReplyToWorkerTy = ReplyToWorker;
	destroy_worker: WorkerDestroyMessageTy = WorkerDestroyMessage;
	update_handler: WorkerUpdateMessageHandlerReplyTy = WorkerUpdateMessageHandlerReply;
	ready: WorkerReadyReplyTy = WorkerReadyReply;
	set = new ReplySetMessages;
	clear = new ReplyClearMessages;
}
export class MakeReplyData {
	t: number;
	v: MakeReplyDataType;
	constructor(reply: number, info: number, from: LocalOrRemoteIdVarType | number, {}) {
		this.t = reply;
		this.v = {
			t: info,
			v: from
		};
	}
}
export class TimeoutSetStrings implements TimeoutSetStringsTy {
	single: typeof TimeoutSetStringS = TimeoutSetStringS;
	repeating: typeof TimeoutSetStringR = TimeoutSetStringR;
}
class TimeoutSetInfo implements TimeoutSetInfoTy {
	single: TimeoutSetSTy = TimeoutSetS
	repeating: TimeoutSetRTy = TimeoutSetR;
}
class TimeoutClearInfo implements TimeoutClearInfoTy {
	single: TimeoutClearSTy = TimeoutClearS;
	repeating: TimeoutClearRTy = TimeoutClearR;
	any: TimeoutClearATy = TimeoutClearA;
}
class TimeoutWorkerTypes implements TimeoutWorkerTypesTy {
	reply: WorkerReplyTypes = new WorkerReplyTypes
	update_message_handler: WorkerUpdateMessageHandlerTy = WorkerUpdateMessageHandler;
	ready: TimeoutMessageRTy = TimeoutMessageR;
	set: TimeoutSetInfo = new TimeoutSetInfo;
	clear: TimeoutClearInfo = new TimeoutClearInfo;
	set_types: TimeoutSetTypesTy = TimeoutSetTypes;
}
class TimeoutFireInfo implements TimeoutFireInfoTy {
	single: TimeoutFireSTy = TimeoutFireS;
	repeating: TimeoutFireRTy = TimeoutFireR;
}
export type ReplyTypesTy = {
	msg1: ReplyMessage1Ty;
	msg2: ReplyMessage2Ty;
	from_worker: ReplyFromWorkerTy;
	to_worker: ReplyToWorkerTy;
	destroy_worker: WorkerDestroyMessageTy;
	update_handler: WorkerUpdateMessageHandlerReplyTy;
	ready: WorkerReadyReplyTy;
	set: ReplySetMessages;
	clear: ReplyClearMessages;
}
export class TimerMessageTypes implements TimerMessageTypesTy {
	async: WorkerAsyncMessageTy = WorkerAsyncMessage;
	reply: ReplyTypesTy = new ReplyTypes;
	fire: TimeoutFireInfoTy = new TimeoutFireInfo;
	worker: TimeoutWorkerTypesTy = new TimeoutWorkerTypes;
}
export class TimeoutClearStrings implements TimeoutClearStringsTy {
	single: typeof TimeoutClearStringS = TimeoutClearStringS;
	repeating: typeof TimeoutClearStringR = TimeoutClearStringR;
}
let g_timer_api = new TimerApi;
export let message_types = g_timer_api.msg_types;
export var is_in_ignored_from_src_fn = {flag:false};
export var is_in_userscript_fn = {flag:false};
export var is_in_userscript = {flag:true};
export let cur_event_fns: (CallableFunction | NewableFunction)[] = [];
export const [weak_scripts, register_obj_with_registry] = find_all_scripts_using_string_apis();
export type MessageTimeoutSingleReply = {
	t: TimeoutSingleReplyTy;
	v: number;
};
type SetSingleMessageData = {
	t: number;
	v: number;
};
type SetRepeatingMessageData = {
	t: number;
	v: number;
}
export type MessageTimeoutSetS = {
	t: TimeoutSetSTy;
	v: SetSingleMessageData;
};
export type MessageTimeoutSetR = {
	t: TimeoutSetRTy;
	v: SetRepeatingMessageData;
}
export let seen_elements = new WeakSet;
;
export const local_logging_level = 3;
export const LOG_LEVEL_ERROR = 1;
export const LOG_LEVEL_WARN = 2;
export const LOG_LEVEL_INFO = 3;
export const LOG_LEVEL_VERBOSE = 4;
export const LOG_LEVEL_TRACE = 5;
SimpleStackVMParser.match_regex = /(.+?)(;|$)/gm;
console.assert(calc_ratio([0, 0]) === 0, "calc ratio of array full of zeros does not divide by zero");
export const debug_id_gen = new UniqueIdGenerator;
export const debug_id_syms: WeakRef<SymbolRef>[] = [];
const auto_buy_obj = new AutoBuy;
export function lightreset_inject() {
	window.g_auto_buy.state_history_clear_for_reset();
	window.g_auto_buy.skip_save = true;
	window.addEventListener('unload', function() {
		window.g_auto_buy.skip_save = false;
		localStorage.auto_buy_timeout_str = "300,300,300,300";
		localStorage.long_wait = (6000 * 2);
	});
	let original = window.g_auto_buy.original_map.get('lightreset');
	if(original) original();
}
export function specialclick_inject(that: number) {
	if(window.allspec[that].done == undefined) window.allspec[that].done = false;
	if(window.allspec[that].cost <= window.totalAtome && window.allspec[that].done == false) {
		let specialsbought_e = window.doc.getElementById('specialsbought');
		let atomsinvest_e = window.doc.getElementById('atomsinvest');
		if(!specialsbought_e || !atomsinvest_e) throw new Error("Invalid");
		specialsbought_e.innerText = window.rounding(++window.specialsbought, false, 0);
		if(that == 74) {
		}
		window.atomsinvest += window.allspec[that].cost;
		atomsinvest_e.innerText = window.rounding(window.atomsinvest, false, 0);
		window.allspec[that].done = true;
		window.totalAtome -= window.allspec[that].cost;
		var diff1 = window.calcDiff(that);
		for(var a in window.arUnit[that][17]) window.arUnit[that][17][a] *= 100;
		window.arUnit[that][5] *= 100;
		var spec_aps = 0;
		if(window.arUnit[that][4] > 0) {
			spec_aps = (window.calcDiff(that) - diff1);
			window.atomepersecond += spec_aps;
		}
		//spell:ignore noti plurials
		if(window.noti) window.gritter('Power-up !', window.toTitleCase(window.plurials(window.arrayNames[that])) + " X100 APS", null, "+" + window.rounding(spec_aps, false, 0) + " APS", "");
		//spell:ignore updateprogress
		window.updateprogress(that);
		$('#spec' + that).remove();
		(that < 74) ? window.seeUnit(that + 1) : window.seeUnit(that - 1);
		window.seeUnit(that);
		//spell:ignore checkspec
		window.checkspec();
		//spell:ignore achiSpec
		window.achiSpec();
	}
}
void ProxyHandlers;
function reload_if_def(obj: {[x: string]: any;}, key: string | number) {
	if(obj[key]) {
		location.reload();
		document.body.innerHTML = "";
		document.head.innerHTML = "";
		document.documentElement.innerHTML = "";
		return true;
	}
	return false;
}
function got_jquery(value: any) {
	Object.defineProperty(window, '$', {
		value,
		writable: true,
		enumerable: true,
		configurable: true
	});
	use_jquery();
}
function use_jquery() {
	let jq = window.$;
	if(!jq) return;
	let res = jq('head');
	let r_proto = Object.getPrototypeOf(res);
	r_proto.lazyload = function(...a: any) {}
	return jq;
}
void reload_if_def;
function proxy_jquery() {
	let val = use_jquery();
	Object.defineProperty(window, '$', {
		get() {
			return val;
		},
		set(value) {
			val = value;
			got_jquery(value);
			return true;
		},
		enumerable: true,
		configurable: true
	});
}
function pace_finish_proxy_apply(func: Function, this_v: any, args: ArrayLike<any>) {
	auto_buy_obj.init();
	window.Pace.bar.finish = func;
	return Reflect.apply(func, this_v, args);
}
function on_game_data_set() {
	remove_bad_dom_script_element();
	auto_buy_obj.pre_init();
	if(window.Pace.bar.progress == 100) {
		auto_buy_obj.init();
		return;
	}
	window.Pace.bar.finish = new Proxy(window.Pace.bar.finish, {
		apply: pace_finish_proxy_apply
	});
}
function remove_cint_item(cint_arr: any[], cint_item: undefined) {
	let idx = cint_arr.indexOf(cint_item);
	cint_arr.splice(idx, 1);
}
function wait_for_game_data(cint_item = null) {
	if(cint_item) {
		remove_cint_item(cint_arr, cint_item);
	}
	if(window._SM_Data) {
		on_game_data_set();
	} else {
		let cint_item = [0, -1];
		let cint = setTimeout(wait_for_game_data, 0, cint_item);
		cint_item[1] = cint;
		cint_arr.push(cint_item.join(","));
	}
}
function on_timers_moved(timers: any) {
	if(window._SM_Data) {
		on_game_data_set();
	} else {
		wait_for_game_data();
	}
	remove_bad_dom_script_element();
}
function dom_add_elm_filter(elm: HTMLScriptElement | null) {
	if(elm && elm.nodeName === "SCRIPT") {
		if(!elm.src) {
			console.log(elm);
			return true;
		}
		if(elm.src && new URL(elm.src).origin === location.origin) {
			remove_bad_dom_script_element();
			return true;
		}
		return false;
	}
	return true;
}
function main() {
	let enable_proxy = true;
	window.cint_arr = cint_arr;
	if(enable_proxy) {
		proxy_jquery();
	}
	let adsbygoogle = window.adsbygoogle;
	let new_arr = [] as unknown as {op: any; push(v: number): void;};
	window.adsbygoogle = new_arr;
	adsbygoogle.op = adsbygoogle.push;
	adsbygoogle.push = function(e: any) {
		adsbygoogle.op(e);
		remove_bad_dom_script_element();
	};
	var prev_node_prototype_insertBefore = Node.prototype.insertBefore;
	document.addEventListener('onContentLoaded', remove_bad_dom_script_element);
	Node.prototype.insertBefore = (<any>function <T extends Node>(this: T, node: T, child: Node | null, ...rest: []) {
		console.assert(rest.length === 0, "unexpected arguments for overwritten Node.prototype.insertBefore");
		let should_insert_1, should_insert_2;
		if(node instanceof HTMLScriptElement) {
			should_insert_1 = dom_add_elm_filter(node);
		}
		if(child instanceof HTMLScriptElement) {
			should_insert_2 = dom_add_elm_filter(child);
		}
		if(!should_insert_1 || !should_insert_2) return node;
		return prev_node_prototype_insertBefore.call(this, node, child);
	})
	remove_bad_dom_script_element();
	window.on_on_timers_moved_first = true;
	let move_timers_to_worker = new Promise(move_timers_to_worker_promise_executor);
	move_timers_to_worker.then(on_timers_moved);
	setTimeout(remove_bad_dom_script_element, 0);
	window.document_write_list = new DocumentWriteList;
	window.document_write_list.attach_proxy(document);
	document.stop = function() {};
}
main();
ScriptStateHost.event_target.dispatchEvent({type: 'userscript', state: 'done'});