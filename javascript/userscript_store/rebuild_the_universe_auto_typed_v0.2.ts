import {NonNull} from "api";
import {IAutoBuy} from "types/rebuild_the_universe_auto_interface";
import {RecursivePartial} from "types/RecursivePartial";
import {InstructionTypeBox} from "./types/vm/VMBoxedInstructionType";
import {InstructionType} from "./types/vm/instruction/mod";
import {IndexedFnBox} from "./types/vm/box/IndexedFunctionBox";
import {IBox} from "./types/vm/box/IBox";
import {IndexBox} from "types/vm/index_access/IndexedObject";
import {NewableFunctionBox} from "types/vm/box/NewableFunctionBox";
import {StackVMBox} from "types/vm/box/StackVMBox";
import {WindowBox} from "types/vm/box/WindowBox";

class RemoteWorkerState {

}

/* eslint-disable no-undef,no-lone-blocks,no-eval */
declare global {
	export interface Window {
		proxy_set: any[];
		atomepersecond: number;
		//spell:words totalAtome lightreset totalAchi _targets_achi
		totalAtome: number;
		prestige: number;
		is_in_ignored_fn(): any;
		__testing__: false;
		bonusAll(): void;
		specialclick(index: number): void;
		lightreset(): void;
		timeplayed: number;
		totalAchi(): number;
		_targets_achi: any[];
		arUnit: any[];
		Get_Unit_Type(v: any): any;
		getUnitPromoCost(v: any): number;
		Find_ToNext(v: number): number;
		_targets: any[];
		mainCalc(v: any): void;
		tonext(v: number): void;
		specialsbought: number;
		doc: Document;
		rounding(v: number, x: any, y: any): string;
		atomsinvest: number;
		calcDiff(v: number): number;
		noti: boolean;
		gritter: any;
		toTitleCase(v: string): string;
		cint_arr: (string | number[])[];
		//spell:words adsbygoogle
		adsbygoogle: {
			op: any,
			push(v: number): void;
		};
		plurials(v: string): string;
		arrayNames: string[];
		updateprogress(v: any): void;
		$: JQueryStatic;
		seeUnit(v: number): any;
		checkspec(): void;
		achiSpec(): void;
		Pace: {
			bar: {
				progress: number,
				finish: Function;
			}
		};
		_SM_Data: any;
		on_on_timers_moved_first: boolean;
		da: any[];
		lightreset(): void;
		specialclick(that: any): void;
		secondinterval?: number;
		atomsaccu: number;
		calcPres(): number;
		g_auto_buy: IAutoBuy;
		g_proxy_state: {hand: {stack_overflow_check: () => any; count_arr: any[];};};
		remoteSetTimeout: (handler: TimerHandler, timeout?: number, ...target_args: any[]) => number;
		remoteSetInterval: (handler: TimerHandler, timeout?: number, ...target_args: any[]) => number;
		remoteClearTimeout: (id?: number) => void;
		remoteClearInterval: (id?: number) => void;
		["g_worker_state"]?: WorkerState;
		mute():void;
		g_mut_observers:any[];
		g_cs?:any[];
		g_page_content:{
			request_content:string,
			cur:string
		};
		g_do_load:((promise_accept: (value: any) => void)=>void) | undefined;
	}
	var window: Window & typeof globalThis;
	export var Window: {
		prototype: Window;
		new(): Window;
	};

	export interface ErrorConstructor {
		new(message?: string): Error;
		(message?: string): Error;
		readonly prototype: Error;
		captureStackTrace(obj:{stack:string}, constructorOpt?:{}):void;
	}
	module globalThis {
		var remote_worker_state: RemoteWorkerState;
	}
	interface HTMLDivElement {
		style: CSSStyleDeclaration;
	}
	interface Document {
		adoptedStyleSheets: CSSStyleSheet[];

		// don't make an error, just do nothing
		stop(): void;
	}
	interface CSSStyleSheet extends StyleSheet {
		replace(string: string): Promise<CSSStyleSheet>
	}
	export namespace WebAssembly {
		var Function: new (types: {parameters: string[]; results: string[];}, arg1: (...v: any[]) => any) => any;
	}
}
export {};
'use strict';
const TIMER_SINGLE = 1;
const TIMER_REPEATING = 2;
const TIMER_TAG_COUNT = 3;
const AUDIO_ELEMENT_VOLUME = 0.58;
const cint_arr: string[] = [];
//spell:disable
const WorkerAsyncMessage = 1;
type WorkerAsyncMessageTy = typeof WorkerAsyncMessage;
const TimeoutFireS = 101;
type TimeoutFireSTy = typeof TimeoutFireS;
const TimeoutFireR = 102;
type TimeoutFireRTy = typeof TimeoutFireR;
const WorkerUpdateMessageHandler = 201;
type WorkerUpdateMessageHandlerTy = typeof WorkerUpdateMessageHandler;
const TimeoutMessageR = 202;
type TimeoutMessageRTy = typeof TimeoutMessageR;
const TimeoutSetS = 203;
type TimeoutSetSTy = typeof TimeoutSetS;
const TimeoutSetR = 204;
type TimeoutSetRTy = typeof TimeoutSetR;
const TimeoutClearS = 205;
type TimeoutClearSTy = typeof TimeoutClearS;
const TimeoutClearR = 206;
type TimeoutClearRTy = typeof TimeoutClearR;
const TimeoutClearA = 207;
type TimeoutClearATy = typeof TimeoutClearA;
const WorkerDestroyMessage = 300;
type WorkerDestroyMessageTy = typeof WorkerDestroyMessage;
const WorkerUpdateMessageHandlerReply = 301;
type WorkerUpdateMessageHandlerReplyTy = typeof WorkerUpdateMessageHandlerReply;
const WorkerReadyReply = 302;
type WorkerReadyReplyTy = typeof WorkerReadyReply;
const ReplySetSingle = 303;
type ReplySetSingleTy = typeof ReplySetSingle;
const ReplySetRepeating = 304;
type ReplySetRepeatingTy = typeof ReplySetRepeating;
const ReplyClearSingle = 305;
type ReplyClearSingleTy = typeof ReplyClearSingle;
const ReplyClearRepeating = 306;
type ReplyClearRepeatingTy = typeof ReplyClearRepeating;
const ReplyClearAny = 307;
type ReplyClearAnyTy = typeof ReplyClearAny;
const ReplyMessage1 = 401;
type ReplyMessage1Ty = typeof ReplyMessage1;
const ReplyMessage2 = 402;
type ReplyMessage2Ty = typeof ReplyMessage2;
const ReplyFromWorker = 500;
type ReplyFromWorkerTy = typeof ReplyFromWorker;
const ReplyToWorker = 600;
type ReplyToWorkerTy = typeof ReplyToWorker;
const TimeoutSingleReply = 700;
type TimeoutSingleReplyTy = typeof TimeoutSingleReply;
const TimeoutRepeatingReply = 701;
type TimeoutRepeatingReplyTy = typeof TimeoutRepeatingReply;
const TimeoutSetTypes = 1001;
type TimeoutSetTypesTy = typeof TimeoutSetTypes;
const TimeoutSetStringS = "setTimeout";
const TimeoutSetStringR = "setInterval";
const TimeoutClearStringS = "clearTimeout";
const TimeoutClearStringR = "clearInterval";
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
type TimeoutSetStringsTy = {
	single: typeof TimeoutSetStringS;
	repeating: typeof TimeoutSetStringR;
};
type TimeoutClearStringsTy = {
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
type RefVarMsg = {
	t: number;
	v: RefVarInfo;
};
type NumInfo = {
	t: number;
	v: number;
};
type NumInfoMsg = {
	t: number;
	v: NumInfo;
};
type NoDataMsg = {
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
class MakeReplyData {
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
class TimeoutSetStrings implements TimeoutSetStringsTy {
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
class TimerMessageTypes implements TimerMessageTypesTy {
	async: WorkerAsyncMessageTy = WorkerAsyncMessage;
	reply: ReplyTypesTy = new ReplyTypes;
	fire: TimeoutFireInfoTy = new TimeoutFireInfo;
	worker: TimeoutWorkerTypesTy = new TimeoutWorkerTypes;
}
class TimeoutClearStrings implements TimeoutClearStringsTy {
	single: typeof TimeoutClearStringS = TimeoutClearStringS;
	repeating: typeof TimeoutClearStringR = TimeoutClearStringR;
}
class TimerApi {
	msg_types = new TimerMessageTypes;
	set_names = new TimeoutSetStrings;
	clear_names = new TimeoutClearStrings;
	handled: number[] = [];
	to_handle: (NoDataMsg | NumInfoMsg | RefVarMsg)[]
	constructor() {
		this.to_handle = [
			{t: TimeoutMessageR},
			{t: TimeoutSetS},
			{t: TimeoutSetR},
			{t: TimeoutClearS},
			new MakeReplyData(ReplyFromWorker, WorkerReadyReply, TimeoutMessageR, {}),
			// TimeoutSetTypeS
			new MakeReplyData(ReplyFromWorker, ReplySetSingle, {
				var: 'local_id'
			}, {}),
			// TimeoutSetTypeR
			new MakeReplyData(ReplyFromWorker, ReplySetRepeating, {
				var: 'local_id'
			}, {}),
			// TimeoutClearS
			new MakeReplyData(ReplyFromWorker, ReplyClearSingle, {
				var: 'remote_id'
			}, {}),
			// TimeoutClearR
			new MakeReplyData(ReplyFromWorker, ReplyClearRepeating, {
				var: 'remote_id'
			}, {})
		];
	}
}
let g_timer_api = new TimerApi;
let message_types = g_timer_api.msg_types;
type ScriptEventTargetType = {
	fns: any[];
	addEventListener(fn: (e: any) => void): void;
	dispatchEvent(ev: {
		type: string;
		state: string;
	}): void;
};
class ScriptStateHost {
	static event_target: ScriptEventTargetType = {
		fns: [],
		addEventListener(fn: (e: any) => void) {
			this.fns.push(fn);
		},
		dispatchEvent(ev: {type: string; state: string;}) {
			let l_fns = this.fns.slice();
			for(let i = 0;i < l_fns.length;i++) {
				let fn = l_fns[i];
				fn(ev);
			}
		}
	}
}
let is_in_ignored_from_src_fn = false;
let is_in_userscript_fn = false;
let is_in_userscript = true;
let cur_event_fns: (CallableFunction | NewableFunction)[] = [];
function find_all_scripts_using_string_apis():
	[typeof scripts_weak_arr, typeof register_obj_with_registry] {
	let scripts = new WeakSet;
	let scripts_holders = [];
	type TokenPtr = {
		token: symbol;
	};

	type TokenType = {
		key: symbol;
		ref: WeakRef<TokenPtr>;
	};

	let scripts_tokens: (TokenType | null)[] = [];
	type WeakFinalInfo = {
		key: symbol;
		id: number;
		ref: WeakRef<any>;
	};

	let scripts_weak_arr: (WeakFinalInfo | null)[] = [];
	let script_registry: FinalizationRegistry<unknown>;
	let script_id = 1;
	window.is_in_ignored_fn = function() {
		return is_in_ignored_from_src_fn;
	}
	ScriptStateHost.event_target.addEventListener((e: any) => {
		is_in_userscript = false;
	});
	function type_verify_extract<T>(val: null[] | T[]): val is T[] {
		return true;
	}
	function retype_arr<T>(in_val: null[] | T[]): T[] | null {
		if(type_verify_extract<T>(in_val)) {
			return in_val;
		}
		return null;
	}
	function register_obj_with_registry(obj: any) {
		let obj_id;
		let scripts_res: WeakFinalInfo[] = [];
		for(let i = 0;i < scripts_weak_arr.length;i++) {
			let elem = scripts_weak_arr[i];
			if(elem !== null) {
				scripts_res.push(elem);
			}
		}
		let obj_ref = scripts_weak_arr.find((e: null | {ref: {deref: () => any;};}) => e && e.ref.deref() === obj);
		if(obj_ref) {
			obj_id = obj_ref.id;
			return obj_id;
		}
		obj_id = script_id;
		script_id++;
		let held_obj = {
			type: 'held',
			id: obj_id,
			key: Symbol(obj_id)
		};
		let token_sym = {token: Symbol(-obj_id)};
		scripts_holders.push(held_obj);
		scripts_tokens.push({key: held_obj.key, ref: new WeakRef(token_sym)});
		scripts_weak_arr.push({
			key: held_obj.key,
			id: obj_id,
			ref: new WeakRef(obj)
		});
		script_registry.register(obj, held_obj, token_sym);
		return obj_id;
	}
	function replace_cb_with_safe_proxy(args: any[], index: number) {
		let value = args[index];
		if(index && args && value instanceof Function) {
			if(is_in_userscript) {
				value.is_userscript_fn = true;
			}
			if(is_in_userscript_fn) {
				value.is_userscript_fn = true;
			}
			if(document.currentScript) {
				value.reg_id = register_obj_with_registry(document.currentScript);
			}
			args[index] = new Proxy(value, {
				apply(...a) {
					let ret;
					let should_reset = false;
					cur_event_fns.push(a[0]);
					let idx = cur_event_fns.indexOf(a[0]);
					if(a[0].is_userscript_fn) {
						is_in_ignored_from_src_fn = true;
						if(is_in_userscript_fn === false) {
							is_in_userscript_fn = true;
							should_reset = true;
						}
					}
					try {
						ret = Reflect.apply(...a);
					} finally {
						if(should_reset) {
							is_in_userscript_fn = false;
							should_reset = false;
						}
						is_in_ignored_from_src_fn = false;
						delete cur_event_fns[idx];
					}
					delete cur_event_fns[idx];
					return ret;
				}
			});
			args = [];
			index = -1;
		}
		value = null;
	}
	EventTarget.prototype.addEventListener = new Proxy(EventTarget.prototype.addEventListener, {
		apply(...a) {
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
			let ret
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
	})
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
	function str_index_of_inject() {
		let cur_script = get_nearest_script();
		if(cur_script === void 0) {
			if(is_in_ignored_from_src_fn) return;
			if(!is_in_userscript) throw new Error("No");
			// a userscript is running
			return;
		}
		let had_script = scripts.has(cur_script);
		if(!had_script) {
			try {
				scripts.add(cur_script);
			} catch(e) {
				debugger;
			}
			let id = register_obj_with_registry(cur_script);
			console.log('new registry id', id);
		}
		if(!had_script) {
			if(cur_script.src.includes("opentracker")) {
				cur_script.remove();
				cur_script = null;
				throw new Error("No tracking");
			}
			console.log(cur_script);
		}
		cur_script = null;
	}
	String.prototype.indexOf = new Proxy(String.prototype.indexOf, {
		apply(...a) {
			str_index_of_inject();
			return Reflect.apply(...a);
		}
	});
	type CleanupType = {
		arr_key: any;
	};

	script_registry = new FinalizationRegistry(function cleanup(held: CleanupType) {
		let arr_key = held.arr_key;
		let weak_state_index = scripts_weak_arr.findIndex(e => e && e.key === arr_key);
		let token_index = scripts_tokens.findIndex(e => e && e.key === arr_key);
		if(weak_state_index === -1) {
			console.log('prev gc', held);
		}
		let token = null;
		let weak_state = null;
		if(token_index > -1) token = scripts_tokens[token_index];
		if(weak_state_index > -1) weak_state = scripts_weak_arr[weak_state_index];
		console.log('gc', weak_state_index, token_index, arr_key, token, weak_state);
		scripts_weak_arr[weak_state_index] = null;
		scripts_tokens[token_index] = null;
	});
	return [scripts_weak_arr, register_obj_with_registry];
}
void find_all_scripts_using_string_apis;
type AnyFunction = CallableFunction | NewableFunction | Function | Object;
type RegIdFunction = {reg_id: number} & AnyFunction;
function has_reg_id(v: AnyFunction): v is RegIdFunction {
	if(v.hasOwnProperty('reg_id')) {
		return true;
	}
	return false;
}
const [weak_scripts, register_obj_with_registry] = find_all_scripts_using_string_apis();
void register_obj_with_registry;
function get_nearest_script() {
	if(document.currentScript !== null) {
		return document.currentScript;
	}
	let cur_script;
	while(cur_event_fns.at(-1) === void 0 && cur_event_fns.length > 0) {
		cur_event_fns.pop();
	}
	let script_ghost = cur_event_fns.at(-1);
	if(!script_ghost) return null;
	if(has_reg_id(script_ghost))
		if(script_ghost && weak_scripts[script_ghost.reg_id - 1]) {
			let reg = weak_scripts[script_ghost.reg_id - 1];
			if(reg && reg.ref.deref()) {
				return reg.ref.deref();
			} else if(document.currentScript === null && !is_in_ignored_from_src_fn) {
				debugger;
			}
		}
	if(cur_script === void 0 && !is_in_userscript && !is_in_userscript_fn && !is_in_ignored_from_src_fn) {
		debugger;
	}
	script_ghost = cur_event_fns.at(-1);
	if(script_ghost) if(has_reg_id(script_ghost)) if(weak_scripts[script_ghost.reg_id - 1]?.ref?.deref?.()) {
		return weak_scripts[script_ghost.reg_id - 1]?.ref?.deref?.();
	};
	let doc_script = document.currentScript;
	if(doc_script === null) {
		return null;
	} else {
		return doc_script;
	}
}
type NullableItem<T> = T | null;
type Nullable2dArray<T> = NullableItem<T[]>[];
type DocumentWriteFn = (...text: string[]) => void;

class DocumentWriteFnProxyHandler {
	other: DocumentWriteList | null = null;
	apply(...a: [target: DocumentWriteFn, thisArg: any, argArray: string[]]) {
		if(this.other) this.other.write(...a);
	}
}

class DocumentWriteList {
	list: Nullable2dArray<string>;
	attached;
	end_symbol;
	constructor() {
		this.list = [];
		this.attached = false;
		this.end_symbol = Symbol(1);
		this.document_write = null;
		this.attached_document = null;
		this.document_write_proxy = null;
	}
	document_write: DocumentWriteFn | null;
	attached_document: Document | null;
	write(target: DocumentWriteFn, thisArg: any, argArray: string[]) {
		console.assert(target === this.document_write);
		console.assert(thisArg === this.attached_document);
		this.list.push(argArray, null);
	}
	document_write_proxy: (DocumentWriteFn | {other: any}) | null;
	attach_proxy(document: Document) {
		if(this.attached) {
			let was_destroyed = this.destroy(true);
			if(!was_destroyed) {
				throw new Error("Can't reattach to document, document.write is not equal to DocumentWriteList.document_write_proxy");
			}
		}
		this.attached_document = document;
		this.document_write = document.write;
		let obj = new DocumentWriteFnProxyHandler;
		obj.other = this;
		this.document_write_proxy = new Proxy(document.write, obj);
		document.write = this.document_write_proxy;
	}
	destroy(should_try_to_destroy: boolean) {
		if(this.attached_document && this.document_write_proxy) {
			console.assert(this.attached_document.write === this.document_write_proxy);
			if(this.attached_document.write !== this.document_write_proxy) {
				if(should_try_to_destroy) {
					return false;
				}
				throw new Error("Unable to destroy: document.write is not equal to DocumentWriteList.document_write_proxy");
			}
			if(this.document_write) this.attached_document.write = this.document_write;
		}
		if(this.document_write_proxy) {
			this.document_write_proxy = null;
		}
		if(this.document_write) {
			this.document_write = null;
		}
		if(this.attached_document) {
			this.attached_document = null;
		}
		if(should_try_to_destroy) {
			return true;
		}
	}
}
class UniqueIdGenerator {
	m_current;
	constructor() {
		this.m_current = -1;
	}
	set_current(current_value: number) {
		this.m_current = current_value;
	}
	current() {
		return this.m_current;
	}
	next() {
		return this.m_current++;
	}
}
class PromiseExecutorHandle {
	m_closed;
	destroyed;
	m_accept: ((arg0: WorkerState | null) => void) | null;
	m_reject;
	constructor(accept: (arg0: WorkerState | null) => void, reject: any) {
		this.m_closed = false;
		this.destroyed = false;
		this.m_accept = accept;
		this.m_reject = reject;
	}
	accept(value: WorkerState | null) {
		if(this.destroyed) throw new Error("accept called on destroyed PromiseExecutorHandle");
		let accept = this.m_accept;
		if(accept) accept(value);
		this.close();
	}
	reject(error: Error) {
		if(this.destroyed) throw new Error("accept called on destroyed PromiseExecutorHandle");
		let reject = this.m_reject;
		reject(error);
		this.close();
	}
	closed() {
		return this.m_closed;
	}
	close() {
		this.m_closed = true;
		this.m_accept = null;
		this.m_reject = null;
	}
	destroy() {
		this.destroyed = true;
	}
}
type WorkerVerifyCallback = {
	(verify_obj: WorkerVerifyType): void;
};

function worker_code_function(verify_callback: WorkerVerifyCallback) {
	const TIMER_SINGLE = 1;
	const TIMER_REPEATING = 2;
	const TIMER_TAG_COUNT = 3;
	if(verify_callback) {
		verify_callback({
			TIMER_SINGLE,
			TIMER_REPEATING,
			TIMER_TAG_COUNT
		});
	}
	class RemoteTimerApi {
		msg_types;
		constructor(msg_types: RecursivePartial<TimerApi['msg_types']>) {
			this.msg_types = msg_types;
		}
		pre_msg_types: {
			worker: {
				set_types: TimeoutSetTypesTy
			}
		} = {
				worker: {
					set_types: TimeoutSetTypes
				}
			}
		set_names: TimeoutSetStringsTy = {
			single: TimeoutSetStringS,
			repeating: TimeoutSetStringR
		}
		clear_names: TimeoutClearStringsTy = {
			single: TimeoutClearStringS,
			repeating: TimeoutClearStringR
		}
	}
	class RemoteWorkerState {
		m_timer: RemoteTimer | null;
		unique_script_id;
		constructor() {
			this.m_timer = null;
			this.unique_script_id = 1;
		}
		set_timer(timer: RemoteTimer) {
			this.m_timer = timer;
		}
		set(tag: TimerTag, remote_id: number, timeout: number) {
			if(this.m_timer) return this.m_timer.set(tag, remote_id, timeout);
		}
		clear(msg: MessageTimeoutClearS | MessageTimeoutClearR) {
			if(this.m_timer) return this.m_timer.do_clear(msg);
		}
	}
	function nop_fn() {};
	function fire_timer(timer: RemoteTimer, remote_id: number) {
		timer.fire(remote_id);
	}
	type NL<T> = T | null;
	let remote_api_info_instance: NL<TimerApi> = null;//new RemoteTimerApi;
	let message_types: NL<TimerApi['msg_types']> = null;//remote_api_info_instance.msg_types;
	let reply_message_types: NL<TimerApi['msg_types']['reply']> = null;//message_types.reply;
	let fire_pause: any[] = [];
	class RemoteTimer {
		m_remote_id_to_state_map;
		m_api_info: NL<TimerApi>;
		base_id;
		constructor(api_info: NL<TimerApi>) {
			this.m_remote_id_to_state_map = new Map;
			if(!api_info) {
				this.m_api_info = null;
				return;
			}
			/**@type {RemoteTimerApi} */
			this.m_api_info = api_info;
			this.base_id = globalThis[this.m_api_info.set_names.single](nop_fn);
			globalThis[this.m_api_info.clear_names.single](this.base_id);
		}
		fire(remote_id: number) {
			let local_state = this.m_remote_id_to_state_map.get(remote_id);
			if(!local_state) return;
			this.validate_state(local_state, remote_id);
			if(!local_state.active) {
				console.log('fire inactive', remote_id, local_state);
				return;
			};
			let tag = local_state.type;
			let msg_id;
			let reply_id!: TimeoutSingleReplyTy | TimeoutRepeatingReplyTy;
			if(!this.m_api_info) return;
			switch(tag) {
				case TIMER_SINGLE: {
					msg_id = this.m_api_info.msg_types.fire.single;
					reply_id = this.m_api_info.msg_types.worker.reply.fire.single;
				} break;
				case TIMER_REPEATING: {
					msg_id = this.m_api_info.msg_types.fire.repeating;
					reply_id = this.m_api_info.msg_types.worker.reply.fire.repeating;
				} break;
			}
			if(!msg_id) {
				console.assert(false, 'Unknown tag in RemoteWorker.fire', tag);
				console.info('TypeError like: let v:TIMER_SINGLE | TIMER_REPEATING (%o | %o) = %o', TIMER_SINGLE, TIMER_REPEATING, tag);
				return;
			}
			if(fire_pause.includes(remote_id)) {
				return;
			} else {
				fire_pause.push(remote_id);
			}
			console.log('worker fire', msg_id, remote_id);
			postMessage({
				t: msg_id,
				v: {
					t: reply_id,
					v: remote_id
				}
			});
		}
		set(tag: TimerTag, remote_id: number, timeout: number) {
			// debugger;
			this.verify_tag(tag);
			let obj = {
				active: true,
				local_id: -1,
				type: tag
			};
			this.m_remote_id_to_state_map.set(remote_id, obj);
			/**@type {typeof this.m_api_info.set_names.single | typeof this.m_api_info.set_names.repeating} */
			let api_name;
			if(!this.m_api_info) return;
			switch(tag) {
				case TIMER_SINGLE: api_name = this.m_api_info.set_names.single; break;
				case TIMER_REPEATING: api_name = this.m_api_info.set_names.repeating; break;
			}
			if(!api_name) return;
			obj.local_id = globalThis[api_name](fire_timer, timeout, this, remote_id);
			return obj.local_id;
		}
		// Please verify your type tag is valid before changing any state, or you might end up in an invalid state
		verify_tag(tag: TimerTag) {
			if(!this.validate_tag(tag)) {
				throw new Error("tag verification failed in RemoteTimer");
			}
		}
		verify_state(state: {local_id: number; type: TimerTag;}, remote_id: number) {
			if(!this.validate_state(state, remote_id)) {
				console.info("Removed invalid local_state");
				if(!this.m_api_info) return;
				globalThis[this.m_api_info.clear_names.single](state.local_id);
				globalThis[this.m_api_info.clear_names.repeating](state.local_id);
				this.m_remote_id_to_state_map.delete(remote_id);
				throw new Error("Tag verification failed in RemoteWorker");
			}
		}
		validate_tag(tag: TimerTag) {
			if(tag < TIMER_SINGLE || tag >= TIMER_TAG_COUNT) {
				console.assert(false, "Assertion failed in RemoteTimer.validate_tag: tag=%o is out of range");
				console.info("Info: range is TIMER_SINGLE to TIMER_TAG_COUNT-1 (%o...%o-1)", tag, TIMER_SINGLE, TIMER_TAG_COUNT);
				return false;
			}
			return true;
		}
		validate_state(state: {local_id?: number; type: TimerTag;}, _remote_id: number) {
			return this.validate_tag(state.type);
		}
		clear(remote_id: number): number | null | undefined {
			if(this.m_remote_id_to_state_map.has(remote_id)) {
				let state = this.m_remote_id_to_state_map.get(remote_id);
				this.verify_state(state, remote_id);
				if(!this.m_api_info) return;
				if(state.type === TIMER_SINGLE) {
					globalThis[this.m_api_info.clear_names.single](state.local_id);
				}
				if(state.type === TIMER_REPEATING) {
					globalThis[this.m_api_info.clear_names.repeating](state.local_id);
				}
				state.active = false;
				this.m_remote_id_to_state_map.delete(remote_id);
				return state.local_id;
			}
			return null;
		}
		do_clear(msg: MessageTimeoutClearS | MessageTimeoutClearR) {
			let remote_id = msg.v;
			let maybe_local_id = this.clear(remote_id);
			if(!message_types) return;
			if(!reply_message_types) return;
			if(maybe_local_id === void 0) return;
			if(maybe_local_id === null) return;
			// debugger;
			switch(msg.t) {
				case message_types.worker.clear.single: {
					// debugger;
					const message: {
						t: typeof reply_message_types.from_worker,
						v: {
							t: typeof message_types.reply.clear.single,
							v: [remote_id: number, local_id: number, msg_from: TimeoutClearSTy]
						}
					} = {
						t: reply_message_types.from_worker,
						v: {
							t: message_types.reply.clear.single,
							v: [remote_id, maybe_local_id, msg.t]
						}
					};
					postMessage(message);
				} break
				case message_types.worker.clear.repeating: {
					// debugger;
					const message: {
						t: typeof reply_message_types.from_worker,
						v: {
							t: typeof message_types.reply.clear.repeating,
							v: [remote_id: number, local_id: number, msg_from: TimeoutClearRTy]
						}
					} = {
						t: reply_message_types.from_worker,
						v: {
							t: message_types.reply.clear.repeating,
							v: [remote_id, maybe_local_id, msg.t]
						}
					};
					postMessage(message);
				} break;
				default: {
					console.error("RemoteTimer.do_clear unexpected message");
					debugger;
				} break;
			}
		}
	}
	let remote_worker_state = new RemoteWorkerState;
	globalThis.remote_worker_state = remote_worker_state;
	remote_worker_state.set_timer(new RemoteTimer(remote_api_info_instance));
	let stored_for_later_messages: WorkerMessageType[] = [];
	type ReplyToWorkerMessageType = {
		t: ReplyToWorkerTy;
		v: never;
	};
	type UpdateWorkerMessageHandler = {
		t: WorkerUpdateMessageHandlerTy;
		v: UpdateMessageHandlerType;
	};
	type MessageTimeoutMessageR = {
		t: TimeoutMessageRTy;
		v: never;
	};
	type WorkerMessageType = MessageTimeoutClearR | ReplyToWorkerMessageType | UpdateWorkerMessageHandler | MessageTimeoutMessageR | MessageTimeoutSetS | MessageTimeoutSetR | MessageTimeoutClearS;
	type UpdateMessageHandlerType = {
		init: string;
		onmessage: string;
	};
	onmessage = function(e: MessageEvent<WorkerMessageType>) {
		let msg = e.data;
		if(!remote_worker_state.m_timer) {
			console.log('got message but don\'t have a timer');
			return;
		}
		if(!reply_message_types || !message_types) {
			stored_for_later_messages.push(e.data);
			return;
		}
		switch(msg.t) {
			case reply_message_types.to_worker/*reply*/: {
				let result = msg.v;
				console.assert(false, "unhandled result on remote worker", result);
				debugger;
			} break;
			case message_types.worker.update_message_handler/*remote worker init*/: {
				debugger;
				let user_msg = msg.v;
				let worker_str = "()"[0];
				worker_str += user_msg.init;
				worker_str += "()"[1];
				worker_str += "()";
				worker_str += "\n";
				worker_str += "onmessage=";
				worker_str += user_msg.onmessage;
				worker_str += "\n";
				worker_str += "//# sourceURL=$__.";
				worker_str += remote_worker_state.unique_script_id;
				eval(worker_str);
				remote_worker_state.unique_script_id++;
				const message: {
					t: typeof reply_message_types.from_worker,
					v: {
						t: 1,
						v: typeof msg.t
					}
				} = {
					t: reply_message_types.from_worker,
					v: {
						t: 1,
						v: msg.t
					}
				}
				postMessage(message);
			} break;
			case message_types.worker.ready/**/: {
				// debugger;
				const message: {
					t: typeof reply_message_types.from_worker,
					v: {
						t: typeof message_types.reply.ready,
						v: typeof msg.t
					}
				} = {
					t: reply_message_types.from_worker,
					v: {
						t: message_types.reply.ready,
						v: msg.t
					}
				};
				postMessage(message);
			} break;
			case message_types.worker.set.single/*remote timer set single*/: {
				// debugger;
				let user_msg = msg.v;
				console.log('worker set single', user_msg.t, user_msg.v);
				let local_id = remote_worker_state.set(TIMER_SINGLE, user_msg.t, user_msg.v);
				if(!local_id) return;
				const message: {
					t: typeof reply_message_types.from_worker,
					v: {
						t: typeof message_types.reply.set.single,
						v: [local_id: number, msg_t: typeof msg.t, u_msg_t: typeof user_msg.t, u_msg_v: typeof user_msg.v]
					}
				} = {
					t: reply_message_types.from_worker,
					v: {
						t: message_types.reply.set.single,
						v: [local_id, msg.t, user_msg.t, user_msg.v]
					}
				};
				postMessage(message);
			} break;
			case message_types.worker.set.repeating/*remote timer set repeating*/: {
				// debugger;
				let user_msg = msg.v;
				console.log('worker set repeating', user_msg.t, user_msg.v);
				let local_id = remote_worker_state.set(TIMER_REPEATING, user_msg.t, user_msg.v);
				if(!local_id) return;
				const message: {
					t: typeof reply_message_types.from_worker,
					v: {
						t: typeof message_types.reply.set.repeating,
						v: [typeof local_id, typeof msg.t, typeof user_msg.t, typeof user_msg.v]
					}
				} = {
					t: reply_message_types.from_worker,
					v: {
						t: message_types.reply.set.repeating,
						v: [local_id, msg.t, user_msg.t, user_msg.v]
					}
				};
				postMessage(message);
			} break;
			case message_types.worker.clear.single/*remote timer do_clear single*/: {
				// debugger;
				remote_worker_state.clear(msg);
			} break;
			case message_types.worker.clear.repeating/*remote timer do_clear repeating*/: {
				// debugger;
				remote_worker_state.clear(msg);
			} break;
			default: {
				console.assert(false, "RemoteWorker: Unhandled message", msg);
				debugger;
			} break;
		}
	}
}
type MessageTimeoutFireS = {
	t: TimeoutFireSTy;
	v: never;
};
type MessageWorkerDestroyMessage = {
	t: WorkerDestroyMessageTy;
	v: never;
};
type MessageReplyMessage1 = {
	t: ReplyMessage1Ty;
	v: never;
};
type MessageReplyMessage2 = {
	t: ReplyMessage2Ty;
	v: never;
};
type MessageWorkerUpdateMessageHandlerReply = {
	t: WorkerUpdateMessageHandlerReplyTy;
	v: WorkerUpdateMessageHandlerTy;
};
type MessageReplyFromWorkerData = {
	t: never;
	v: never;
};
type MessageReplyFromWorker = {
	t: ReplyFromWorkerTy;
	v: MessageReplyFromWorkerData;
};
type MessageTypesForWorkerReplies = MessageReplyFromWorker | MessageReplyMessage2 | MessageReplyMessage1 | MessageWorkerDestroyMessage | MessageTimeoutFireS;
type MessageWorkerReadyReply = {
	t: WorkerReadyReplyTy;
	v: TimeoutMessageRTy;
};
type MessageReplySetSingle = {
	t: ReplySetSingleTy;
	v: never;
};
type MessageReplySetRepeating = {
	t: ReplySetRepeatingTy;
	v: never;
};
type MessageReplyClearSingle = {
	t: ReplyClearSingleTy;
	v: never;
};
type MessageReplyClearRepeating = {
	t: ReplyClearRepeatingTy;
	v: never;
};
type MessageTimeoutClearS = {
	t: TimeoutClearSTy;
	v: number;
};
type MessageTimeoutClearR = {
	t: TimeoutClearRTy;
	v: number;
}

type DispatchMessageType = MessageTimeoutClearR | MessageTimeoutClearS | MessageReplyClearRepeating | MessageReplyClearSingle | MessageReplySetRepeating | MessageReplySetSingle | MessageWorkerReadyReply | MessageWorkerUpdateMessageHandlerReply | MessageReplyMessage2 | MessageReplyMessage1 | MessageReplyFromWorkerData;
type MessageTimeoutClearA = {
	t: TimeoutClearATy;
	v: number;
};
type MessageTimeoutSingleReply = {
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
type MessageTimeoutSetS = {
	t: TimeoutSetSTy;
	v: SetSingleMessageData;
};
type MessageTimeoutSetR = {
	t: TimeoutSetRTy;
	v: SetRepeatingMessageData;
}
class WorkerState {
	flags: Map<string, boolean>;
	worker_code;
	timer: Timer;
	executor_handle;
	worker: Worker | null;
	worker_url: string | null;
	constructor(worker_code_blob: Blob, timer: Timer, executor_handle: PromiseExecutorHandle | null) {
		this.flags = new Map;
		this.flags.set('has_blob', false);
		if(worker_code_blob instanceof Blob) this.flags.set('has_blob', true);
		if(!this.flags.get('has_blob')) throw new Error("WorkerState requires a blob with javascript code to execute on a worker");
		if(!timer) throw new Error("WorkerState needs a timer");
		this.flags.set('rejected', false);
		this.flags.set('valid', false);
		this.flags.set('connected', false);
		this.flags.set('failed', false);
		this.worker_code = worker_code_blob;
		this.timer = timer;
		timer.set_worker_state(this);
		this.executor_handle = executor_handle;
		this.worker = null;
		this.worker_url = null;
	}
	set_failed(has_failed: boolean) {
		this.flags.set('failed', has_failed);
	}
	init() {
		if(this.flags.get('connected') || this.flags.get('valid')) {
			this.destroy();
		}
		this.flags.set('connected', false);
		let weak_worker_state: WeakRef<WorkerState> = new WeakRef(this);
		this.worker_url = URL.createObjectURL(this.worker_code);
		if(this.flags.get('failed')) return;
		this.worker = new Worker(this.worker_url);
		this.worker.onmessage = function onmessage(e: MessageEvent<MessageTypesForWorkerReplies>) {
			var msg = e.data;
			let worker_state = weak_worker_state.deref();
			if(!worker_state) {
				console.log('lost worker state');
				this.terminate();
				return;
			}
			switch(msg.t) {
				case TimeoutFireS/*worker_state.timer single fire*/: {
					worker_state.timer.fire(TIMER_SINGLE, msg.v);
					break;
				}
				case TimeoutFireS/*worker_state.timer repeating fire*/: {
					worker_state.timer.fire(TIMER_REPEATING, msg.v);
					break;
				}
				case WorkerDestroyMessage/*worker_state destroy*/:
					worker_state.destroy();
					break;
				case ReplyMessage1:
				case ReplyMessage2/*worker_state dispatch_message_unpacked*/: {
					debugger;
					worker_state.dispatch_message(msg);
					break;
				}
				case ReplyFromWorker/*worker_state dispatch_message*/: {
					worker_state.dispatch_message(msg.v);
					break;
				}
				default: {
					console.assert(false, "Main: Unhandled message", msg);
					debugger;
					break;
				}
			}
		};
		this.flags.set('valid', true);
		this.worker.postMessage({
			t: message_types.worker.ready
		});
	}
	set_executor_handle(handle: PromiseExecutorHandle) {
		this.executor_handle = handle;
	}
	on_result(result: DispatchMessageType) {
		if(!this.executor_handle) return;
		switch(result.v) {
			case message_types.worker.update_message_handler: {
				console.assert(result.t === WorkerUpdateMessageHandlerReply);
				console.log("remote_worker onmessage function changed");
				break;
			}
			case message_types.worker.ready: {
				console.assert(result.t === WorkerReadyReply);
				if(this.executor_handle.closed()) {
					console.assert(false, "WorkerState used with closed executor_handle");
					break;
				}
				l_log_if(LOG_LEVEL_VERBOSE, "remote_worker ready");
				WorkerState.set_global_state(this);
				this.executor_handle.accept(this);
				this.flags.set('connected', true);
				break;
			}
		}
	}
	dispatch_message(result: DispatchMessageType) {
		switch(result.t) {
			case WorkerUpdateMessageHandlerReply: {
				debugger;
				this.on_result(result);
			} break;
			case WorkerReadyReply: {
				// debugger;
				this.on_result(result);
			} break;
			case ReplyMessage1: {
				debugger;
				this.on_result(result);
			} break;
			case ReplyMessage2: {
				debugger;
				this.timer.on_result(result);
			} break;
			case ReplySetSingle: {
				// debugger;
				this.timer.on_reply(result);
			} break;
			case ReplySetRepeating: {
				// debugger;
				this.timer.on_reply(result);
			} break;
			case message_types.reply.clear.single: {
				// debugger;
				this.timer.on_reply(result);
			} break;
			case message_types.reply.clear.repeating: {
				// debugger;
				this.timer.on_reply(result);
			} break;
			case TimeoutClearR: {
				// debugger;
				this.timer.on_reply(result);
			} break;
			case TimeoutClearS: {
				// debugger;
				this.timer.on_reply(result);
			} break;
			default: {
				console.assert(false, "unhandled result", result);
				debugger;
			}
		}
	}
	postMessage(data: MessageTimeoutFireS | MessageTimeoutClearA | MessageTimeoutSingleReply | MessageTimeoutClearS | MessageTimeoutSetS | MessageTimeoutSetR | MessageTimeoutClearR) {
		if(this.worker) return this.worker.postMessage(data);
	}
	static has_old_global_state_value(worker_state_value: WorkerState) {
		return this.has_global_state() && !this.equals_global_state(worker_state_value);
	}
	static equals_global_state(worker_state_value: WorkerState) {
		return this.get_global_state() === worker_state_value;
	}
	static maybe_delete_old_global_state_value(worker_state_value: WorkerState) {
		if(this.has_old_global_state_value(worker_state_value)) {
			this.delete_old_global_state();
		}
	}
	static maybe_delete_old_global_state() {
		if(this.has_global_state()) {
			this.delete_old_global_state();
			return true;
		}
		return false;
	}
	static delete_old_global_state() {
		let old_worker_state = this.get_global_state();
		if(old_worker_state) {
			const before_destroy_call_name = 'delete_global_state';
			this.destroy_old_worker_state(old_worker_state, before_destroy_call_name);
		}
	}
	static destroy_old_worker_state(worker_state_value: {destroy: () => void;}, before_destroy_call_name: 'delete_global_state') {
		this[before_destroy_call_name]();
		worker_state_value.destroy();
	}
	static global_state_key: 'g_worker_state' = "g_worker_state";
	static has_global_state() {
		return window.hasOwnProperty(this.global_state_key);
	}
	static get_global_state(): WorkerState | undefined {
		return window[this.global_state_key];
	}
	static set_global_state(worker_state_value: WorkerState) {
		this.maybe_delete_old_global_state_value(worker_state_value);
		window[this.global_state_key] = worker_state_value;
	}
	static delete_global_state() {
		delete window[this.global_state_key];
	}
	destroy() {
		if(this.worker) {
			this.worker.terminate();
			this.worker = null;
			if(this.worker_url) URL.revokeObjectURL(this.worker_url);
			this.worker_url = null;
			this.flags.set('connected', false);
			this.flags.set('valid', false);
			if(this.executor_handle && !this.executor_handle.closed()) {
				this.executor_handle.reject(new Error("Worker destroyed before it was connected"));
			}
		};
		this.timer.destroy();
	}
}
function timer_nop() {}
type TimerTag = 1 | 2;
class TimerState {
	active;
	type;
	repeat;
	target_fn;
	target_args;
	timeout;
	constructor(tag: TimerTag, is_repeating: boolean, target_fn: TimerHandler, target_args: any[], timeout: number) {
		this.active = true;
		this.type = tag;
		this.repeat = is_repeating;
		this.target_fn = target_fn
		this.target_args = target_args;
		this.timeout = timeout;
	}
}
type SetMessageData = {
	t: number;
	v: number;
};

class Timer {
	id_generator;
	m_remote_id_to_main_state_map: any;
	m_api_map;
	m_api_info: TimerApi;
	weak_worker_state: WeakRef<WorkerState> | null;
	m_remote_id_to_state_map: Map<number | string, TimerState>;
	constructor(id_generator: UniqueIdGenerator, api_info: TimerApi) {
		this.id_generator = id_generator;
		this.m_remote_id_to_state_map = new Map;
		this.weak_worker_state = null;
		this.m_api_map = new Map;
		this.m_api_info = api_info;
		this.set_api_names(api_info.set_names, api_info.clear_names)
	}
	set_map_names(names: TimerApi['set_names'] | TimerApi['clear_names']) {
		this.m_api_map.set(names.single, window[names.single]);
		this.m_api_map.set(names.repeating, window[names.repeating]);
	}
	base_id: number | undefined;
	set_api_names(set: TimerApi['set_names'], clear: TimerApi['clear_names']) {
		this.set_map_names(set);
		this.set_map_names(clear);
		this.base_id = window[set.single](timer_nop);
		window[clear.single](this.base_id);
		this.id_generator.set_current(this.base_id);
	}
	set_worker_state(worker_state_value: any) {
		this.weak_worker_state = new WeakRef(worker_state_value);
	}
	// If you cause any side effects, please
	// wrap this call in try{}finally{} and
	// revert all side effects...
	verify_tag(tag: TimerTag) {
		if(!this.validate_tag(tag)) {
			throw new Error("Verify failed in Timer.verify_tag");
		}
	}
	verify_state(state: TimerState, remote_id: number) {
		if(!this.weak_worker_state) return;
		if(!this.validate_state(state)) {
			let worker_state = this.weak_worker_state.deref();
			if(!worker_state) return;
			worker_state.postMessage({
				t: this.m_api_info.msg_types.worker.clear.any,
				v: remote_id
			});
			throw new Error("Verify failed in Timer.verify_timer_state");
		}
	}
	validate_tag(tag: TimerTag) {
		if(tag != TIMER_SINGLE && tag != TIMER_REPEATING) {
			console.assert(false, "Assertion failure in Timer.validate_tag: tag=%o is out of range");
			console.info("Info: range is TIMER_SINGLE to TIMER_TAG_COUNT-1 (%o...%o-1)", tag, TIMER_SINGLE, TIMER_TAG_COUNT);
			return false;
		}
		return true;
	}
	validate_state(state: TimerState) {
		return this.validate_tag(state.type);
	}
	fire(tag: TimerTag, remote_id: number) {
		let state = this.get_state_by_remote_id(remote_id);
		if(!state) {
			this.force_clear(tag, remote_id);
			return;
		}
		if(!this.weak_worker_state) return;
		let should_reset_user_fn = false;
		let should_reset_ign = false;
		if(typeof state.target_fn != 'string') cur_event_fns.push(state.target_fn);
		let idx = -1;
		if(typeof state.target_fn != 'string') cur_event_fns.indexOf(state.target_fn);
		try {
			if(state.active) {
				if((<any>state.target_fn).is_userscript_fn) {
					if(is_in_ignored_from_src_fn === false) {
						is_in_ignored_from_src_fn = true;
						should_reset_ign = true;
					}
					if(is_in_userscript_fn === false) {
						is_in_userscript_fn = true;
						should_reset_user_fn = true;
					}
				}
				if(state.target_fn instanceof Function) {
					state.target_fn.apply(null, state.target_args);
				} else {
					let fn = new Function(state.target_fn);
					state.target_fn = fn;
					state.target_fn.apply(null, state.target_args);
				}
			}
		} finally {
			if(should_reset_ign) is_in_ignored_from_src_fn = false;
			if(should_reset_user_fn) is_in_userscript_fn = false;
			delete cur_event_fns[idx];
			if(tag === TIMER_SINGLE) {
				state.active = false;
				this.clear(tag, remote_id);
			}
			let worker_state = this.weak_worker_state.deref();
			if(!worker_state) return;
			worker_state.postMessage({
				t: this.m_api_info.msg_types.worker.reply.fire.single,
				v: remote_id
			});
		}
	}
	set(tag: TimerTag, target_fn: TimerHandler, timeout: number | undefined, target_args: any) {
		let remote_id = this.id_generator.next();
		let is_repeating = false;
		this.verify_tag(tag);
		if(tag === TIMER_REPEATING) {
			is_repeating = true;
		}
		if(typeof timeout === 'string') {
			let tmp_timeout = parseInt(timeout, 10);
			if(!Number.isNaN(tmp_timeout)) {
				timeout = tmp_timeout;
			} else {
				timeout = 30;
			}
		}
		if(!timeout || timeout < 0) timeout = 0;
		let state = new TimerState(tag, is_repeating, target_fn, target_args, timeout);
		if(is_in_userscript) {
			(<any>target_fn).is_userscript_fn = true;
		}
		if(is_in_userscript_fn) {
			(<any>target_fn).is_userscript_fn = true;
		}
		// if(document.currentScript){
		// 	target_fn.reg_id=register_obj_with_registry(document.currentScript);
		// }
		// if(get_nearest_script()){
		// 	target_fn.reg_id=register_obj_with_registry(get_nearest_script());
		// }
		this.store_state_by_remote_id(state, remote_id);
		this.send_worker_set_message(tag, {
			t: remote_id,
			v: timeout
		});
		return remote_id;
	}
	send_worker_set_message(tag: TimerTag, obj: SetMessageData) {
		if(!this.weak_worker_state) return;
		let worker_state = this.weak_worker_state.deref();
		if(!worker_state) {
			console.assert(false, 'tried to send_worker_message, but the gc collected the worker_state, referenced with a WeakRef (weak_worker_state)');
			return;
		}
		let msg_id: TimeoutSetRTy | TimeoutSetSTy;
		switch(tag) {
			case TIMER_SINGLE: msg_id = this.m_api_info.msg_types.worker.set.single; break;
			case TIMER_REPEATING: msg_id = this.m_api_info.msg_types.worker.set.repeating; break;
		}
		if(!msg_id) {
			console.assert(false, 'Unknown timer_tag', tag);
			console.info('TypeError like: let v:TIMER_SINGLE | TIMER_REPEATING (%o | %o) = %o', TIMER_SINGLE, TIMER_REPEATING, tag);
			return;
		}
		worker_state.postMessage({
			t: msg_id,
			v: obj
		});
	}
	is_state_stored_by_remote_id(remote_id: number) {
		return this.m_remote_id_to_state_map.has(remote_id);
	}
	get_state_by_remote_id(remote_id: number) {
		let state = this.m_remote_id_to_state_map.get(remote_id);
		if(!state) return null;
		this.verify_state(state, remote_id);
		return state;
	}
	store_state_by_remote_id(state: TimerState, remote_id: number) {
		this.m_remote_id_to_state_map.set(remote_id, state);
	}
	delete_state_by_remote_id(remote_id: number) {
		this.m_remote_id_to_state_map.delete(remote_id);
	}
	remote_id_to_state_entries() {
		return this.m_remote_id_to_state_map.entries();
	}
	on_result(result: DispatchMessageType) {
		console.log(result);
		debugger;
		switch(result.t) {
			case this.m_api_info.msg_types.worker.clear.single: {
				let remote_id = result.v;
				if(!remote_id) return;
				this.delete_state_by_remote_id(remote_id);
				break;
			}
			case this.m_api_info.msg_types.worker.clear.repeating: {
				let remote_id = result.v;
				if(!remote_id) return;
				this.delete_state_by_remote_id(remote_id);
				break;
			}
			default:
				console.assert(false, 'on_result timer_result_msg needs a handler for', result.t);
		}
	}
	on_reply(result: DispatchMessageType) {
		switch(result.t) {
			case this.m_api_info.msg_types.worker.clear.single: {
				debugger;
				let remote_id = result.v;
				this.delete_state_by_remote_id(remote_id);
				break;
			}
			case this.m_api_info.msg_types.worker.clear.repeating: {
				debugger;
				let remote_id = result.v;
				this.delete_state_by_remote_id(remote_id);
				break;
			}
			case ReplySetSingle: {
				//debugger;
			} break;
			case ReplySetRepeating: {
				// debugger;
			} break;
			case ReplyClearSingle: {
				debugger;
			} break;
			case message_types.reply.clear.repeating: {
				// debugger;
			} break;
			default:
				console.log('reply', result);
				console.assert(false, 'on_result msg needs a handler for', result);
				debugger;
		}
	}
	force_clear(tag: TimerTag, remote_id: number) {
		if(!this.weak_worker_state) return;
		this.verify_tag(tag);
		let worker_state = this.weak_worker_state.deref();
		if(!worker_state) return;
		let state = this.get_state_by_remote_id(remote_id);
		if(!state) throw new Error("No state for id");
		if(state.active) {
			return this.clear(tag, remote_id);
		}
		// we have to trust the user, go ahead and send the message
		// anyway (this can technically send structured cloneable objects)
		if(tag === TIMER_SINGLE) {
			worker_state.postMessage({
				t: this.m_api_info.msg_types.worker.clear.single,
				v: remote_id
			});
		} else if(tag === TIMER_REPEATING) {
			worker_state.postMessage({
				t: this.m_api_info.msg_types.worker.clear.repeating,
				v: remote_id
			});
		}
	}
	clear(tag: TimerTag, remote_id?: number) {
		this.verify_tag(tag);
		if(remote_id === void 0) return;
		let state = this.get_state_by_remote_id(remote_id);
		if(!this.weak_worker_state) return;
		if(state?.active) {
			let worker_state = this.weak_worker_state.deref();
			if(!worker_state) return;
			if(state.type === TIMER_SINGLE) {
				worker_state.postMessage({
					t: this.m_api_info.msg_types.worker.clear.single,
					v: remote_id
				});
			} else if(state.type === TIMER_REPEATING) {
				worker_state.postMessage({
					t: this.m_api_info.msg_types.worker.clear.repeating,
					v: remote_id
				});
			}
			state.active = false;
		}
	}
	destroy() {
		let api_info = this.m_api_info;
		let api_map = this.m_api_map;
		window[api_info.set_names.single] = api_map.get(api_info.set_names.single);
		window[api_info.set_names.repeating] = api_map.get(api_info.set_names.repeating);
		window[api_info.clear_names.single] = api_map.get(api_info.clear_names.single);
		window[api_info.clear_names.repeating] = api_map.get(api_info.clear_names.repeating);
		for(var state_entry of this.remote_id_to_state_entries()) {
			let id = state_entry[0];
			void id;
			let state = state_entry[1];
			if(state.type === TIMER_SINGLE) {
				// if the timer might get reset when calling the function while
				// the timer functions are reset to the underlying api
				if(state.target_fn instanceof Function) {
					state.target_fn.apply(null, state.target_args);
				} else {
					eval(state.target_fn);
				}
			}
		}
		this.m_api_map.clear();
	}
}
class VerifyError extends Error {
	constructor(message: string | undefined) {
		super(message);
		this.name = "VerifyError";
	}
}
function VERIFY(assert_result: boolean, assert_message: string) {
	if(!assert_result) {
		throw new VerifyError(assert_message);
	}
}
type WorkerVerifyType = {
	TIMER_SINGLE: typeof TIMER_SINGLE;
	TIMER_REPEATING: typeof TIMER_REPEATING;
	TIMER_TAG_COUNT: typeof TIMER_TAG_COUNT;
}
function do_worker_verify(verify_obj: WorkerVerifyType) {
	VERIFY(verify_obj.TIMER_SINGLE === TIMER_SINGLE, "TIMER_SINGLE constant matches");
	VERIFY(verify_obj.TIMER_REPEATING === TIMER_REPEATING, "TIMER_REPEATING constant matches");
	VERIFY(verify_obj.TIMER_TAG_COUNT === TIMER_TAG_COUNT, "TIMER_TAG_COUNT constant matches");
	VERIFY(Object.keys(verify_obj).length === 3, "keys(verify_obj).length is expected value");
	return;
}

function move_timers_to_worker_promise_executor(
	executor_accept: (arg0: WorkerState | null) => void,
	executor_reject: () => void,
) {
	let failed = false;
	if(globalThis.remote_worker_state) {
		postMessage({t: WorkerDestroyMessage});
		executor_accept(null);
		return;
	}
	if(WorkerState.maybe_delete_old_global_state()) return null;
	try {
		worker_code_function(do_worker_verify);
	} catch(e) {
		console.log(e);
		executor_accept(null);
		failed = true;
	}
	const worker_code_blob = new Blob(["(", worker_code_function.toString(), ")()", "\n//# sourceURL=$__.0"]);
	let id_generator = new UniqueIdGenerator;
	let timer = new Timer(id_generator, new TimerApi);
	let executor_handle = null;
	if(!failed) {
		executor_handle = new PromiseExecutorHandle(executor_accept, executor_reject);
	}
	const worker_state = new WorkerState(worker_code_blob, timer, executor_handle);
	worker_state.set_failed(failed);
	worker_state.init();
	const weak_worker_state = new WeakRef(worker_state);
	const setTimeout_global = setTimeout;
	function remoteSetTimeout(handler: TimerHandler, timeout: number | undefined, ...target_args: any[]) {
		if(!worker_state) {
			window.setTimeout = setTimeout_global;
			l_log_if(LOG_LEVEL_WARN, 'lost worker_state in timer');
			return setTimeout_global(handler, timeout, ...target_args);
		}
		return worker_state.timer.set(TIMER_SINGLE, handler, timeout, target_args);
	}
	const clearTimeout_global = clearTimeout;
	/**@arg {number} id */
	function remoteClearTimeout(id?: number) {
		if(!worker_state) {
			window.clearTimeout = clearTimeout_global;
			l_log_if(LOG_LEVEL_WARN, 'lost worker_state in timer');
			return clearTimeout_global(id);
		}
		worker_state.timer.clear(TIMER_SINGLE, id);
	}
	const setInterval_global = setInterval;
	function remoteSetInterval(handler: TimerHandler, timeout?: number, ...target_args: any[]) {
		if(!worker_state) {
			window.setInterval = setInterval_global;
			l_log_if(LOG_LEVEL_WARN, 'lost worker_state in timer');
			return setInterval_global(handler, timeout, ...target_args);
		}
		return worker_state.timer.set(TIMER_REPEATING, handler, timeout, target_args);
	}
	const clearInterval_global = clearInterval;
	function remoteClearInterval(id: number | undefined) {
		if(!worker_state) {
			window.clearInterval = clearInterval_global;
			l_log_if(LOG_LEVEL_WARN, 'lost worker_state in timer');
			return clearInterval_global(id);
		}
		worker_state.timer.clear(TIMER_REPEATING, id);
	}
	window.remoteSetTimeout = remoteSetTimeout;
	window.remoteSetInterval = remoteSetInterval;
	window.remoteClearTimeout = remoteClearTimeout;
	window.remoteClearInterval = remoteClearInterval;
	if(!failed) {
		window.setTimeout = remoteSetTimeout;
		window.setInterval = remoteSetInterval;
		window.clearTimeout = remoteClearTimeout;
		window.clearInterval = remoteClearInterval;
	}
	return {
		get() {
			return weak_worker_state.deref();
		}
	};
}
let seen_elements = new WeakSet;
function remove_bad_dom_script_element_callback(e: HTMLScriptElement) {
	if(seen_elements.has(e)) return;
	seen_elements.add(e);
	if(!e.src) return;
	if(e.src.includes("analytics.js") && e.src.includes("google")) {
		e.remove();
		return;
	}
	if(e.src.includes("platform.js")) {
		e.remove();
		return;
	}
	//spell:disable-next-line
	if(e.src.indexOf("opentracker") > -1) {
		e.remove();
		return;
	}
	//spell:disable-next-line
	if(e.src.includes("pagead/js/adsbygoogle.js")) {
		e.remove();
		return;
	}
	if(new URL(e.src).origin != location.origin) return;
	if(e.src.indexOf("ads") > -1 || e.src.indexOf("track") > -1) {
		e.remove();
		return;
	}
}
function remove_bad_dom_script_element() {
	Array.prototype.forEach.call(document.querySelectorAll("script"), remove_bad_dom_script_element_callback);
};
class EventHandlerDispatch<T> {
	target_obj: T;
	target_fn;
	constructor(target_obj: T, target_fn: (this: T, event: Event) => void) {
		this.target_obj = target_obj;
		this.target_fn = target_fn;
	}
	do_handle_event(event: Event) {
		this.target_fn.call(this.target_obj, event);
	}
	handleEvent(v: Event) {
		this.do_handle_event(v);
	}
}
abstract class AbstractVM {
	abstract execute_instruction(instruction: InstructionType): void;
	abstract run(): IBox;
}
class BaseVMCreate extends AbstractVM {
	flags: Map<string, boolean>;
	instructions;
	instruction_pointer;
	running;
	constructor(instructions: InstructionType[]) {
		super();
		this.flags = new Map;
		this.instructions = instructions;
		this.instruction_pointer = 0;
		this.running = false;
	}
	reset() {
		this.instruction_pointer = 0;
		this.running = false;
	}
	is_in_instructions(value: number) {
		return value >= 0 && value < this.instructions.length;
	}
	execute_instruction(instruction:InstructionType) {
		switch(instruction[0]) {
			default: {
				console.info('Unknown opcode', instruction[0]);
				throw new Error('Halt: bad opcode (' + instruction[0] + ')');
			}
			case 'je': {
				let [, target] = instruction;
				if(this.is_in_instructions(target)) {
					throw new Error("RangeError: Jump target is out of instructions range");
				}
				if(this.flags.get('equal')) {
					this.instruction_pointer = target;
				}
			} break;
			case 'jmp': {
				let [, target] = instruction;
				if(this.is_in_instructions(target)) {
					throw new Error("RangeError: Jump target is out of instructions range");
				}
				this.instruction_pointer = target;
			} break;
			case 'halt'/*Running*/: this.running = false; break;
		}
	}
	run(): IBox {
		this.running = true;
		while(this.instruction_pointer < this.instructions.length && this.running) {
			let instruction = this.instructions[this.instruction_pointer];
			this.execute_instruction(instruction);
			this.instruction_pointer++;
		}
		return null;
	}
}
function trigger_debug_breakpoint() {
	debugger;
}
const local_logging_level = 3;
function l_log_if(level: number, ...args: any[]) {
	if(level <= local_logging_level) {
		console.log(...args);
	}
}
const LOG_LEVEL_ERROR = 1;
void LOG_LEVEL_ERROR;
const LOG_LEVEL_WARN = 2;
const LOG_LEVEL_INFO = 3;
void LOG_LEVEL_INFO;
const LOG_LEVEL_VERBOSE = 4;
const LOG_LEVEL_TRACE = 5;
void LOG_LEVEL_TRACE;
class BaseStackVM extends BaseVMCreate {
	stack: IBox[];
	return_value: IBox;
	constructor(instructions: InstructionType[]) {
		super(instructions);
		this.stack = [];
		this.return_value = void 0;
	}
	reset() {
		super.reset();
		this.stack.length = 0;
		this.return_value = void 0;
	}
	push(value: IBox) {
		this.stack.push(value);
	}
	pop(): IBox {
		if(this.stack.length === 0) {
			throw new Error("stack underflow");
		}
		let pop_value = this.stack.pop();
		return pop_value;
	}
	pop_arg_count(operand_number_of_arguments: any) {
		let arguments_arr = [];
		let arg_count = operand_number_of_arguments;
		for(let i = 0;i < arg_count;i++) {
			if(this.stack.length <= 0) {
				throw new Error('stack underflow in pop_arg_count');
			}
			arguments_arr.unshift(this.pop());
		}
		return arguments_arr;
	}
	execute_instruction(instruction: InstructionType) {
		switch(instruction[0]) {
			case 'push'/*Stack*/: {
				for(let i = 0;i < instruction.length-1;i++) {
					let item = instruction[i+1];
					this.push(item);
				}
			} break;
			case 'drop'/*Stack*/: this.pop(); break;
			case 'get'/*Object*/: {
				let target_name = this.pop();
				if(target_name === void 0) break;
				let target_obj = this.pop();
				if(target_obj === void 0) break;
				if(typeof target_obj != 'object') break;
				if(typeof target_name != 'string') break;
				if(target_obj instanceof IndexBox) {
					this.push(target_obj.value[target_name]);
				}
			} break;
			case 'call'/*Call*/: {
				let number_of_arguments = instruction[1];
				if(number_of_arguments === void 0) return;
				if(typeof number_of_arguments != 'number') return;
				if(number_of_arguments <= 1) {
					throw new Error("Not enough arguments for call (min 2, target_this, target_fn)");
				}
				let [target_this, target_fn, ...arg_arr] = this.pop_arg_count(number_of_arguments);
				if(!(target_fn instanceof Function)) break;
				let ret = target_fn.apply(target_this, arg_arr);
				this.push(ret);
			} break;
			case 'construct'/*Construct*/: {
				let number_of_arguments = instruction[1];
				if(typeof number_of_arguments != 'number') return;
				let [construct_target, ...construct_arr] = this.pop_arg_count(number_of_arguments);
				if(construct_target instanceof Function) {
					let obj = new (<any>construct_target)(...construct_arr);
					this.push(obj);
				} else if(construct_target instanceof NewableFunctionBox) {
					let obj = new construct_target.value(...construct_arr);
					this.push(obj);
				} else {
					console.assert(false, 'try to construct non function');
					debugger;
				}
				l_log_if(LOG_LEVEL_VERBOSE, instruction, ...this.stack.slice(this.stack.length - number_of_arguments));
			} break;
			case 'return'/*Call*/:
				let ret = this.pop();
				this.return_value = ret;
				break;
			case 'modify_operand': {
				let [, target, offset] = instruction;
				if(typeof offset != 'number') return;
				if(typeof target === 'number') {
					if(this.is_in_instructions(target)) {
						throw new Error("RangeError: Destination is out of instructions range");
					}
					let instruction_modify = new InstructionTypeBox(this.instructions[target]);
					let value = this.pop();
					if(typeof value === 'string') {
						instruction_modify.value[offset] = value;
					}
					let verify_state: [number] = [instruction_modify.value.length];
					let out_ins: string[] = [];
					for(let i = 0;i < instruction_modify.value.length;i++) {
						let cur = instruction_modify.value[i];
						if(typeof cur === 'string') {
							out_ins.push(cur);
						} else {
							console.log('need type for', cur);
						}
					}
					let valid_instruction = SimpleStackVMParser.verify_instruction(out_ins, verify_state);
					this.instructions[target] = valid_instruction;
					console.log('new verify state', verify_state);
					console.assert(verify_state[0] === 0, "not all of the operands typechecked");
				}
			} break;
			case 'push_pc': {
				this.push(this.instruction_pointer);
			} break;
			default: super.execute_instruction(instruction); break;
		}
	}
	run(): IBox {
		this.running = true;
		while(this.instruction_pointer < this.instructions.length && this.running) {
			let instruction = this.instructions[this.instruction_pointer];
			this.execute_instruction(instruction);
			this.instruction_pointer++;
		}
		console.assert(this.stack.length === 0, "stack length is not zero, unhandled data on stack");
		return this.return_value;
	}
}
class SimpleStackVM<T> extends BaseStackVM {
	args_vec: (T extends Array<T> ? T : [T]) | null;
	constructor(instructions: any) {
		super(instructions);
		this.args_vec = null;
	}
	reset() {
		super.reset();
		this.args_vec = null;
	}
	execute_instruction_raw(instruction:InstructionType) {
		switch(instruction[0]) {
			case 'this'/*Special*/: this.push(new StackVMBox(this)); break;
			// TODO: if you ever use this on a worker, change
			// it to use globalThis...
			case 'global'/*Special*/: this.push(new WindowBox(window)); break;
			case 'breakpoint'/*Debug*/: trigger_debug_breakpoint(); break;
			case 'call'/*Call*/: {
				// TODO: Fix the other code to use the call handling from
				// the base class
				// Currently we support applying functions
				// this is closer to what you expect, not to just get
				// the name of a member to call
				let number_of_arguments = instruction[1];
				let [target_obj, target_name, ...arg_arr] = this.pop_arg_count(number_of_arguments);
				if(typeof target_name == 'string') {
					if(target_obj instanceof IndexedFnBox) {
						let ret = target_obj.value[target_name](...arg_arr);
						this.push(ret);
					}
				}
			} break;
			default: super.execute_instruction(instruction); break;
		}
	}
	run(...run_arguments: T extends T[] ? T : [T]) {
		this.args_vec = run_arguments;
		return super.run();
	}
}
type FormattableTypes = string | (() => void) | ((err: IBox) => void);
class SimpleStackVMParser {
	/**@arg {string[] | number[]} cur @arg {number} arg_loc*/
	static parse_int_arg(cur_item: string | number) {
		if(typeof cur_item == 'string') {
			let arg = cur_item;
			if(arg[3] === '()'[0] && arg.at(-1) === "()"[1]) {
				let str_int = arg.slice(4, -1);
				return parseInt(str_int, 10);
			}
		}
	}
	static parse_string_with_format_ident(str: string, format_list: FormattableTypes[]) {
		let format_index = str.indexOf('%');
		let format_type = str[format_index + 1];
		switch(format_type) {
			case 'o':
				let obj = format_list.shift();
				if(!obj) throw new Error("Format list underflow");
				return obj;
			default:
				console.log("%s", 'unsupported format spec %' + format_type);
		}
	}
	static parse_current_instruction(cur: (number | string | ((err: IBox) => void))[], format_list: FormattableTypes[]) {
		let arg_loc = 1;
		let arg = cur[arg_loc];
		while(arg) {
			if(typeof arg != 'string') {
				arg_loc++;
				arg = cur[arg_loc];
				continue;
			}
			if(arg.slice(0, 3) === 'int') {
				let int_res = this.parse_int_arg(arg);
				if(!int_res) throw new Error("Failed to parse int");
				cur[arg_loc] = int_res;
			}
			if(arg.includes('%')) {
				let res = this.parse_string_with_format_ident(arg, format_list);
				if(!res) throw new Error("Failed to parse format ident");
				cur[arg_loc] = res;
			}
			arg_loc++;
			arg = cur[arg_loc];
		}
	}
	static raw_parse_handle_regexp_match(m: string[]) {
		let iter = m[1].trim();
		if(iter.startsWith("//")) return [];
		while(iter.startsWith("/*")) {
			let j = iter.indexOf("*/");
			iter = iter.slice(j + 2).trim();
		}
		if(!iter) return [];
		return iter.split(",");
	}
	static match_regex: RegExp;
	static parse_string_into_raw_instruction_stream(string: string): string[][] {
		const parser_max_match_iter = 390;
		let parts: RegExpExecArray | null, arr: string[][] = [], i = 0;
		do {
			parts = this.match_regex.exec(string);
			if(!parts) break;
			let res = this.raw_parse_handle_regexp_match(parts);
			if(res) arr.push(res);
		} while(parts && i++ < parser_max_match_iter);
		if(parts) console.assert(false, 'SimpleStackVM Parser: Iteration limit exceeded (limit=%o)', parser_max_match_iter);
		return arr;
	}
	static parse_instruction_stream_from_string(string: string, format_list: FormattableTypes[]) {
		let raw_instructions = this.parse_string_into_raw_instruction_stream(string);
		for(let i = 0;i < raw_instructions.length;i++) {
			let raw_instruction = raw_instructions[i];
			this.parse_current_instruction(raw_instruction, format_list);
		}
		let instructions = this.verify_raw_instructions(raw_instructions); return instructions;
	}
	static verify_instruction(instruction: string[], left: [number]): InstructionType {
		const [m_opcode, ...m_operands] = instruction;
		switch(m_opcode) {
			// variable argument count
			case 'push':
				left[0] = 0;
				return [m_opcode, ...m_operands];
			case 'call'/*1 argument*/:
				left[0] -= 2;
				if(typeof m_operands[0] === 'number' && Number.isFinite(m_operands[0])) return [m_opcode, m_operands[0]];
				else {
					console.info("Can't verify that call instruction is valid, argument (%o) is not a number or not finite", m_operands[0]);
					throw new Error("TypeError: Invalid argument");
				}
			case 'drop':
			case 'get':
			case 'return':
			case 'halt':
			case 'push_args':
			case 'this':
			case 'global':
			case 'breakpoint'/*opcode*/:
				left[0]--;
				return [m_opcode];
			default:
				console.info("Info: opcode=%o instruction_parameters=%o", m_opcode, m_operands);
				throw new Error("Unexpected opcode");
		}
	}
	static verify_raw_instructions(raw_instructions: string[][]): InstructionType[] {
		const instructions: InstructionType[] = [];
		for(let i = 0;i < raw_instructions.length;i++) {
			const instruction = raw_instructions[i];
			const left: [number] = [instruction.length];
			const valid_instruction = this.verify_instruction(instruction, left);
			instructions.push(valid_instruction);
			if(left[0] > 0) throw new Error("Typechecking failure, data left when processing raw instruction stream");
		}
		return instructions;
	}
}
SimpleStackVMParser.match_regex = /(.+?)(;|$)/gm;
class EventHandlerVMDispatch extends SimpleStackVM<Event> {
	target_obj;
	constructor(instructions: InstructionType[], target_obj: AutoBuy) {
		super(instructions);
		this.target_obj = target_obj;
	}
	handleEvent(event: Event) {
		this.reset();
		this.run(event);
	}
}
class CompressionStatsCalculator {
	hit_counts: number[];
	cache: string[];
	constructor() {
		this.hit_counts = [];
		this.cache = [];
	}
	map_values() {
		return this.hit_counts;
	}
	map_keys() {
		return this.cache;
	}
	add_hit(index: number) {
		if(!this.hit_counts[index]) {
			this.hit_counts[index] = 1;
		} else this.hit_counts[index]++;
	}
	add_item(key: string) {
		let index = this.cache.indexOf(key)
		if(index == -1) index = this.cache.push(key);
		else this.add_hit(index);
	}
	reset() {
		this.cache.length = 0;
		this.hit_counts.length = 0;
	}
	calc_compression_stats(arr: string[], win_size: number): string[][] {
		this.reset();
		for(let i = 0;i < arr.length;i++) {
			if(i + win_size < arr.length) {
				this.add_item(arr.slice(i, i + win_size).join(","));
			}
		}
		let mk = this.map_keys();
		let mv = this.map_values();
		let tuple_of = to_tuple_arr(mk, mv);
		return tuple_of.filter((e) => e[1] !== void 0);
	}
	calc_for_stats_window_size(stats_arr: string[][][], arr: string[], win_size: number) {
		stats_arr[win_size - 1] = this.calc_compression_stats(arr, win_size);
	}
	calc_for_stats_index(stats_arr: string[][][], arr: string[], index: number) {
		stats_arr[index] = this.calc_compression_stats(arr, index + 1);
	}
}
class BaseCompression {
	did_compress(src: string[], dst: string[]) {
		return dst.length < src.length;
	}
	did_decompress(src: string[], dst: string[]) {
		return dst.length > src.length;
	}
	compress_result(src: string[], dst: string[]) {
		if(this.did_compress(src, dst)) return [true, dst];
		return [false, src];
	}
	decompress_result(src: string[], dst: string[]): [res: boolean, dst: string[]] {
		// maybe this is not a decompression, just a modification to make
		// later decompression work
		if(this.did_decompress(src, dst)) return [true, dst];
		return [false, dst];
	}
}
class MulCompression extends BaseCompression {
	stats_calculator;
	compression_stats: never[][];
	constructor() {
		super();
		this.stats_calculator = new CompressionStatsCalculator;
		this.compression_stats = [];
	}
	try_compress(arr: string[]) {
		let ret = [];
		for(let i = 0;i < arr.length;i++) {
			let item = arr[i];
			if(i + 1 < arr.length) {
				if(item === arr[i + 1]) {
					let off = 1;
					while(item === arr[i + off]) {
						off++;
					}
					if(off > 1) {
						ret.push(`${item}${off}`);
						i += off - 1;
						continue;
					}
				}
			}
			ret.push(item);
		}
		return this.compress_result(arr, ret);
	}
	try_decompress(arr: string[]): [res: boolean, dst: string[]] {
		let ret = [];
		for(let i = 0;i < arr.length;i++) {
			let item = arr[i];
			if(i + 1 < arr.length) {
				let [item_type, num_data] = [item[0], item.slice(1)];
				let parsed = parseInt(num_data);
				if(!Number.isNaN(parsed)) {
					for(let j = 0;j < parsed;j++)ret.push(item_type);
					continue;
				}
			}
			ret.push(arr[i]);
		}
		return this.decompress_result(arr, ret);
	}
	compress_array(arr: string[]) {
		let success, res;
		[success, res] = this.try_decompress(arr);
		if(success) arr = res;
		for(let i = 0;i < 4;i++) {
			this.stats_calculator.calc_for_stats_index(this.compression_stats, arr, i);
			let ls = this.compression_stats[i];
			if(ls.length > 0) {
				continue;
			}
			break;
		}
		[success, res] = this.try_compress(arr);
		if(success) return res;
		return arr;
	}
}
function calc_ratio(arr: number[]) {
	let ratio_acc = 0;
	for(let i = 0;i < arr.length;i++)ratio_acc += arr[i];
	// don't divide by zero
	if(ratio_acc === 0) return 0;
	return ratio_acc / arr.length;
}
console.assert(calc_ratio([0, 0]) === 0, "calc ratio of array full of zeros does not divide by zero");
class AverageRatio {
	arr
	history: number[]
	count
	len
	history_len
	weight
	human_duration
	// @AverageRatio
	constructor(max_len: number, max_history_len: number, weight: number, human_duration: string, initial_arr: number[] = []) {
		this.arr = initial_arr;
		this.history = [];
		this.count = 0;
		this.len = max_len;
		this.history_len = max_history_len;
		this.weight = weight;
		this.human_duration = human_duration;
	}
	add(value: number, from_prev: boolean, debug = false) {
		if(from_prev) {
			if(debug) console.log("ratio add", this.human_duration, (value * 100).toFixed(5));
			this.arr.unshift(value);
			this.history.unshift(value);
			if(this.history.length > this.history_len) this.history.pop();
			if(this.arr.length > this.len) this.arr.pop();
			this.count++;
			if(this.count > this.len) {
				this.count = 0;
				return true;
			}
		} else {
			this.arr[0] = value;
		}
		return false;
	}
	can_average() {
		return this.arr.length > 1;
	}
	get_average() {
		return calc_ratio(this.arr);
	}
}
class AbstractTarget {
	fire() {
		throw new Error("Attempt to call an abstract class");
	}
}
type TimeoutTargetObjects = AutoBuy | AutoBuyState;
type CallbackType1 = () => void;
type CallbackType2 = (this: TimeoutTargetObjects) => void;
type TimeoutTargetCallbackType = CallbackType2 | CallbackType1;
class TimeoutTarget extends AbstractTarget {
	once;
	obj;
	callback;
	description;
	constructor(obj: TimeoutTargetObjects, callback: TimeoutTargetCallbackType, description: string) {
		super();
		this.once = true;
		this.obj = obj
		this.callback = callback;
		this.description = description;
	}
	fire() {
		this.callback.call(this.obj);
	}
}
class IntervalTarget extends AbstractTarget {
	once;
	obj;
	callback;
	description;
	constructor(obj: never, callback: () => void, description: never) {
		super();
		this.once = false;
		this.obj = obj
		this.callback = callback;
		this.description = description;
	}
	fire() {
		this.callback.call(this.obj);
	}
}
void IntervalTarget;
type PromiseExecutorRejectCallback = (reason?: any) => void;

class PromiseTimeoutTarget {
	description;
	m_promise: Promise<void> | null;
	constructor(description: string) {
		this.description = description;
		this.promise_accept = null;
		this.callback = null;
		this.m_promise = new Promise(this.promise_executor.bind(this));
	}
	get_promise() {
		return this.m_promise;
	}
	promise_accept: ((value: void | PromiseLike<void>) => void) | null;
	callback: ((value: void | PromiseLike<void>) => void) | null;
	promise_executor(accept: (value: void | PromiseLike<void>) => void, reject: PromiseExecutorRejectCallback) {
		void reject;
		this.promise_accept = accept;
		this.callback = this.on_result.bind(this);
	}
	on_result(value: void | PromiseLike<void>) {
		this.m_promise = null;
		if(this.promise_accept) this.promise_accept(value);
	}
	fire() {
		let callback = this.callback;
		if(callback) callback();
	}
}
class AsyncTimeoutTarget extends PromiseTimeoutTarget {
	wait() {
		return this.get_promise();
	}
}
type BaseNodeParent = {
	remove_child(v: BaseNode): void;
};

class BaseNode {
	parent: BaseNodeParent | null;
	constructor() {
		this.parent = null;
	}
	set_parent(parent: BaseNodeParent | null) {
		this.parent = parent;
	}
	remove() {
		if(this.parent) this.parent.remove_child(this);
	}
	run() {
		// do nothing
	}
	destroy() {
		this.remove();
	}
}
class BaseTimeoutNode extends BaseNode {
	timeout;
	constructor(timeout: number | undefined) {
		super();
		this.timeout = timeout;
	}
	get_timeout() {
		return this.timeout;
	}
}
class TimeoutIdNode extends BaseTimeoutNode {
	id: number | null;
	m_is_timeout: boolean;
	constructor(id: number | null = null, is_timeout_flag: boolean) {
		super(void 0);
		this.id = id;
		this.m_is_timeout = is_timeout_flag;
	}
}
class TimeoutNode extends BaseTimeoutNode {
	id: number | null | undefined;
	target: AbstractTarget | null;
	constructor(timeout = 0) {
		super(timeout);
		this.id = null;
		this.target = null;
	}
	set_target(target: any) {
		this.target = target;
	}
	set() {
		this.id = setInterval(this.run.bind(this), this.timeout);
	}
	start(target: AbstractTarget | null | undefined) {
		if(target) this.target = target;
		this.set();
	}
	run() {
		this.id = null;
		this.remove();
	}
	destroy() {
		if(this.id !== null) clearTimeout(this.id);
	}
}
class IntervalNode extends BaseTimeoutNode {
	id: number | null | undefined;
	target: AbstractTarget | null;
	constructor(timeout = 0) {
		super(timeout);
		this.id = null;
		this.target = null;
	}
	set() {
		this.id = setInterval(this.run.bind(this), this.timeout);
	}
	set_target(target: any): void {
		this.target = target;
	}
	start(target: AbstractTarget | null) {
		if(target) this.set_target(target);
		this.set();
	}
	destroy() {
		if(this.id !== null) clearInterval(this.id);
	}
}
class AsyncTimeoutNode extends TimeoutNode {
	run() {
		super.run();
		if(this.target) this.target.fire();
	}
	start_async(target: AsyncTimeoutTarget | null) {
		if(target) {
			this.target = target;
			this.set();
			return target.wait();
		}
		throw new Error("unable to start_async without anything to wait for");
	}
}
class AsyncNodeRoot {
	children: BaseNode[];
	constructor() {
		this.children = [];
	}
	set(target_fn: () => void, timeout: number, repeat = false) {
		let node: TimeoutNode | IntervalNode;
		if(repeat) {
			node = new TimeoutNode(timeout);
		} else {
			node = new IntervalNode(timeout);
		}
		this.append_child(node);
		node.start({
			fire() {
				target_fn();
			}
		});
	}
	append_raw(timeout_id: number, is_timeout_id: boolean) {
		this.append_child(new TimeoutIdNode(timeout_id, is_timeout_id));
	}
	append_child(record: BaseNode): void {
		record.remove();
		record.set_parent(this);
		this.children.push(record);
	}
	remove_child(record: BaseNode) {
		let index = this.children.indexOf(record);
		this.children.splice(index, 1);
		record.set_parent(null);
	}
	destroy() {
		let item = this.children.shift();
		if(!item) return;
		do {
			console.log('timer destroy', item);
			item.destroy();
			item = this.children.shift();
		} while(item);
	}
}
class AverageRatioRoot {
	map: Map<string, AverageRatio>;
	ordered_keys: string[];
	constructor() {
		this.map = new Map;
		this.ordered_keys = [];
	}
	set_ordered_keys(ordered_keys: string[]) {
		this.ordered_keys = ordered_keys;
	}
	can_average(key: string) {
		let ratio_calc = this.map.get(key);
		if(ratio_calc) return ratio_calc.can_average();
	}
	get_average(key: string) {
		let ratio_calc = this.map.get(key);
		if(ratio_calc) return ratio_calc.get_average();
		return 0;
	}
	push_ratio([key, ratio_obj]: [key: string, ratio_obj: AverageRatio]) {
		this.ordered_keys.push(key);
		this.map.set(key, ratio_obj);
	}
	push(value: number) {
		let cur = this.map.get(this.ordered_keys[0]);
		if(!cur) return;
		let res = cur.add(value, true, false);
		for(let i = 1;i < this.ordered_keys.length;i++) {
			let debug = false;
			let key = this.ordered_keys[i];
			cur = this.map.get(key);
			if(!cur) continue;
			let prev = this.map.get(this.ordered_keys[i - 1]);
			if(!prev) continue;
			if(key === '30min') debug = true;
			res = cur.add(prev.get_average(), res, debug);
		}
	}
}
type TAutoBuyRoot = {
	append_child(v: AsyncTimeoutNode): void;
};

class AutoBuyState {
	root_node
	debug
	arr: number[];
	ratio
	compressor_stats: never[];
	arr_max_len
	val
	ratio_mode
	locked_cycles
	is_init_complete;
	avg;
	ratio_mult: number;
	div: number;
	constructor(root: TAutoBuyRoot) {
		this.root_node = root;
		this.debug = false;
		this.arr = [];
		this.ratio = 0;
		this.compressor_stats = [];
		this.arr_max_len = 5 * 60;
		this.val = 1;
		this.ratio_mode = 0;
		this.locked_cycles = 0;
		this.prev_atomepersecond = 0;
		this.ratio_mult = 0;
		this.div = 0;
		this.is_init_complete = false;
		this.avg = new AverageRatioRoot;
	}
	prev_atomepersecond: number;
	init() {
		if(window.atomepersecond === 0) {
			let node = new AsyncTimeoutNode(0);
			this.root_node.append_child(node);
			node.start(new TimeoutTarget(this, this.init, 'not ready AutoBuyState.update'));
			return;
		}
		this.val = window.totalAtome / window.atomepersecond;
		let rep_val = this.val / (100 * 4 * window.prestige);
		if(Number.isFinite(rep_val)) {
			for(let i = 0;i < 8;i++) {
				this.arr.push(rep_val * .75);
			}
		} else {
			rep_val = 0.75;
		}
		let ratio_names = ['10sec', '1min', '5min', '30min', '3hour'];
		let ratio_counts = [80, 6, 5, 6, 6];
		let ratio_mul = [0, .65, .15, .15, .05];
		let ratio_human = ["10 seconds", "1 minute", "5 minutes", "30 minutes", "3 hours"];
		function mul_3(arr: number[], i: any) {
			let [a, b = 1, c = 10] = arr.slice(i);
			return a * b * c;
		}
		//@AverageRatio
		function create_ratio(i: number) {
			return new AverageRatio(ratio_counts[i], mul_3(ratio_counts, i), ratio_mul[i], ratio_human[i], [rep_val]);
		}
		for(let i = 0;i < 5;i++) {
			let obj = create_ratio(i);
			this.avg.push_ratio([ratio_names[i], obj]);
		}
		this.prev_atomepersecond = window.atomepersecond;
		this.is_init_complete = true;
	}
	calc_ratio() {
		if(this.avg.can_average('30min')) return this.avg.get_average('30min');
		if(this.avg.can_average('5min')) return this.avg.get_average('5min');
		if(this.avg.can_average('1min')) return this.avg.get_average('1min');
		if(this.avg.can_average('10sec')) return this.avg.get_average('10sec');
		return 0;
	}
	append_value(value: number) {
		if(!Number.isFinite(value)) {
			console.assert(false, 'value is not finite');
		}
		this.arr.unshift(value);
		this.avg.push(value);
		while(this.arr.length > this.arr_max_len) {
			this.arr.pop();
		}
		let new_ratio = this.calc_ratio();
		if(!Number.isFinite(new_ratio)) {
			console.assert(false, 'ratio result is not finite');
		}
		this.ratio = new_ratio;
	}
	update_ratio_mode() {
		switch(this.ratio_mode) {
			case 0: if(this.ratio > .4) this.do_ratio_lock(1, 80 * 12); break;
			case 1:
				if(this.ratio < .35) this.do_ratio_lock(-1, 80 * 3);
				if(this.ratio > .60) this.do_ratio_lock(1, 80 * 12); break;
			case 2:
				if(this.ratio < .45) this.do_ratio_lock(-1, 80 * 3);
				if(this.ratio > .85) this.do_ratio_lock(1, 80 * 12); break;
			case 3:
				if(this.ratio < .9) this.do_ratio_lock(-1, 80 * 3);
				if(this.ratio > 1.5) this.on_very_high_ratio(); break;
			default:
				if(this.ratio < .9) this.do_ratio_lock(-1, 80 * 6);
				if(this.ratio > 1.5) this.on_very_high_ratio(2); break;
		}
	}
	do_ratio_lock(mode_change_direction: number, num_of_cycles: number) {
		this.ratio_mode += mode_change_direction;
		this.locked_cycles = num_of_cycles;
	}
	on_very_high_ratio(mul = 1) {
		console.log('high ratio', this.ratio_mode, mul, (~~(this.ratio * 100)) / 100);
		this.do_ratio_lock(1, 80 * 12 * mul);
	}
	get_mul_modifier() {
		switch(this.ratio_mode) {
			case 0: return 3;
			case 1: return 2;
			case 2: return 1.5;
			case 3: return 1;
			default: return 0.4;
		}
	}
	get_near_val() {
		let log_val = this.avg.get_average('5min');
		let log_mul_count = 0;
		if(log_val < 0.01 || log_val > 1) {
			while(log_val < 0.1) {
				log_val *= 10;
				log_mul_count--;
			}
			while(log_val > 1) {
				log_val /= 10;
				log_mul_count++;
			}
		}
		return [log_val, log_mul_count];
	}
	cycle_log() {
		let [num, exponent] = this.get_near_val();
		console.log('ratio cycle lock %se%o %s%o %s%o', (~~(num * 1000)) / 1000, exponent, 'mode=', this.ratio_mode, 'cc=', this.locked_cycles);
	}
	update() {
		if(typeof window.prestige == 'undefined') {
			console.log('fail', this.div, window.atomepersecond, window.totalAtome);
			let node = new AsyncTimeoutNode(80);
			this.root_node.append_child(node);
			node.start(new TimeoutTarget(this, this.update, 'not ready AutoBuyState.update'));
			return;
		}
		this.ratio_mult = window.prestige;
		this.div = 60 * this.ratio_mult * 8;
		this.val = window.totalAtome / window.atomepersecond / this.div;
		if(!Number.isFinite(this.val)) {
			this.val = 1;
			console.log('fail', this.div, window.atomepersecond, window.totalAtome);
			let node = new AsyncTimeoutNode(80);
			this.root_node.append_child(node);
			node.start(new TimeoutTarget(this, this.update, 'not ready AutoBuyState.update'));
			return;
		}
		this.val *= this.get_mul_modifier();
		this.append_value(this.val);
		if(this.locked_cycles > 0) {
			this.locked_cycles--;
		} else {
			this.update_ratio_mode();
			if(this.locked_cycles > 0) this.cycle_log();
		}
	}
	reset() {
		this.ratio *= 0.75;
		for(var i = 0;i < this.arr.length;i++) {
			this.arr[i] *= 0.75;
		}
	}
}
class MiniDom {
	constructor(elements: any) {
	}
	build_dom() {
	}
}
const debug_id_gen = new UniqueIdGenerator;
type SymbolRef = {
	sym: symbol;
};

const debug_id_syms: WeakRef<SymbolRef>[] = [];
function next_debug_id() {
	const id = debug_id_gen.next();
	const sym = Symbol(id);
	debug_id_syms.push(new WeakRef({sym}));
	return sym;
}
void next_debug_id;
class AbstractBox {
	type: string;
	value: null;
	constructor() {
		this.type = 'AbstractBox';
		this.value = null;
	}
}
void AbstractBox;
class DomValueBox {
	type: string;
	from: string;
	value: any;
	constructor(from: string, value: any) {
		this.type = 'DomValueBox';
		this.from = from;
		this.value = value;
	}

}
class DomBuilderVM extends BaseStackVM {
	exec_stack: ([IBox[], InstructionType[]])[];
	jump_instruction_pointer: number | null;
	constructor(instructions: InstructionType[]) {
		super(instructions);
		this.exec_stack = [];
		this.jump_instruction_pointer = null;
	}
	execute_instruction_raw(instruction:InstructionType) {
		l_log_if(LOG_LEVEL_VERBOSE, ...instruction, null);
		switch(instruction[0]) {
			case 'exec': {
				this.exec_stack.push([this.stack, this.instructions]);
				let base_ptr = this.stack.length;
				// advance the instruction pointer, when we return we want to resume
				// at the next instruction...
				this.instruction_pointer++;
				this.stack.push(this.instruction_pointer, base_ptr);
				this.stack = [];
				this.instructions = <any>instruction[1];
				this.jump_instruction_pointer = 0;
				l_log_if(LOG_LEVEL_VERBOSE, 'exec', ...<any>instruction[1]);
			} break;
			case 'peek': {
				let [, op_1, op_2] = instruction;
				let peek_stack = this.exec_stack[<any>op_1][0];
				let base_ptr = peek_stack.at(-1);
				let at = peek_stack[<any>base_ptr - <any>op_2 - 1];
				this.push(at);
				l_log_if(LOG_LEVEL_VERBOSE, 'peek, pushed value', at, op_2, 'base ptr', base_ptr, 'ex_stack', op_1);
			} break;
			case 'append': {
				if(this.stack.length <= 0) {
					throw new Error('stack underflow');
				}
				let target = this.pop();
				if(this.stack.length <= 0) {
					throw new Error('stack underflow');
				}
				let child_to_append = this.pop();
				this.verify_dom_box(<any>target);
				this.verify_dom_box(<any>child_to_append);
				if((<any>child_to_append).from !== 'create') {
					console.warn('Are you sure you want to move elements around? child_to_append was not an element you created', child_to_append);
				}
				if(this.can_use_box(<any>target) && this.can_use_box(<any>child_to_append)) {
					if((<any>target).value && (<any>child_to_append).value) {
						(<any>target).value.appendChild((<any>child_to_append).value);
					} else {
						console.assert(false, 'box has no value');
					}
				} else {
					console.warn('not using box');
				}
				l_log_if(LOG_LEVEL_VERBOSE, 'append to dom', [target, child_to_append]);
			} break;
			default/*Debug*/: super.execute_instruction(instruction); break;
		}
	}
	can_use_box(box: {from: string;}) {
		return box.from === 'get' || box.from === 'create';
	}
	verify_dom_box(box: {type: string | undefined; from: any; value: any;}) {
		if(box.type === void 0) throw new Error("Invalid Box (no type)");
		if(box.type != 'DomValueBox') throw new Error("Unbox failed not a DomValueBox");
		if(typeof box.from != 'string') throw new Error("Unbox failed Box.from is not a string");
		if(typeof box.value != 'object') throw new Error("Unbox failed: Box is not boxing an object");
	}
	run() {
		this.running = true;
		while(this.instruction_pointer < this.instructions.length && this.running) {
			let instruction = this.instructions[this.instruction_pointer];
			this.execute_instruction_raw(instruction);
			if(this.jump_instruction_pointer != null) {
				this.instruction_pointer = this.jump_instruction_pointer;
				this.jump_instruction_pointer = null;
			} else {
				this.instruction_pointer++;
			}
			if(this.instruction_pointer >= this.instructions.length) {
				if(this.exec_stack.length > 0) {
					let exec_top = this.exec_stack.pop();
					if(!exec_top) {
						throw new Error("Invalid");
					}
					[this.stack, this.instructions] = exec_top;
					let base_ptr = this.stack.pop();
					let next_ip = this.stack.pop();
					if(typeof next_ip != 'number') throw new Error("Invalid");
					this.instruction_pointer = next_ip;
					l_log_if(LOG_LEVEL_VERBOSE, 'returned to', this.instruction_pointer, this.exec_stack.length);
					continue;
				}
				l_log_if(LOG_LEVEL_VERBOSE, 'reached end of instruction stream, nothing to return too', instruction, this.instructions, this.instruction_pointer);
			}
		}
		console.assert(this.stack.length === 0, "stack length is not zero, unhandled data on stack");
		return this.return_value;
	}
}
class DataLoader {
	//spell:words externref
	static int_parser = new WebAssembly.Function({parameters: ['externref'], results: ['f64']}, parseInt);
	store: Storage;
	null_sym: symbol;
	constructor(storage: Storage) {
		this.store = storage;
		this.null_sym = Symbol('null');
	}
	load_str_arr(key: any, def_value: any) {
		let data = this.store.getItem(key);
		if(data === null) return this.create_default(def_value);
		return data.split(",");
	}
	load_int_arr(key: any, def_value: any) {
		let storage_data = this.store.getItem(key);
		if(storage_data === null) return this.create_default(def_value);
		return this.parse_int_arr(storage_data);
	}
	parse_int = DataLoader.int_parser;
	default_split(string: string) {
		return string.split(",");
	}
	parse_int_arr(data: any) {
		return this.default_split(data).map(DataLoader.int_parser);
	}
	create_default(value_or_factory: () => any) {
		let value = this.null_sym;
		if(typeof value_or_factory === 'function') {
			// this is a value factory
			return value_or_factory();
		}
		let cc = Object.getPrototypeOf(value_or_factory).constructor;
		try {
			// get it as an object, the convert back to unboxed if possible
			value = (new cc(value_or_factory)).valueOf();
		} catch {}
		if(value === this.null_sym) {
			// none of them worked, it is a default value that you can't construct and call valueOf on
			return value_or_factory;
		}
		return value;
	}
}
class AutoBuy {
	state_history_arr: any;
	root_node: AsyncNodeRoot;
	extra: number;
	background_audio: HTMLAudioElement | null;
	skip_save: boolean;
	iter_count: number;
	epoch_len: number;
	compressor: any;
	cint_arr: never[];
	local_data_loader: DataLoader;
	state: AutoBuyState;
	debug: boolean;
	epoch_start_time: number;
	original_map: Map<any, any>;
	dom_map: Map<any, any>;
	debug_arr: string[];
	timeout_arr: any;
	display_style_sheet?: CSSStyleSheet;
	history_element?: HTMLDivElement;
	timeout_element?: HTMLDivElement;
	hours_played_element?: HTMLDivElement;
	percent_ratio_element?: HTMLDivElement;
	percent_ratio_change_element?: HTMLDivElement;
	state_log_element?: HTMLDivElement;
	state_history_arr_max_len: number | undefined;
	last_value: number | undefined;
	pre_total: any;
	[v: symbol]: string;
	async_compress() {
		this.state_history_arr = this.compressor.compress_array(this.state_history_arr);
	}
	constructor() {
		this.root_node = new AsyncNodeRoot;
		this.extra = 0; this.iter_count = 0; this.epoch_len = 0;
		this.background_audio = null; this.state_history_arr = null;
		this.skip_save = false;
		this.cint_arr = [];
		this.local_data_loader = new DataLoader(localStorage);
		this.state = new AutoBuyState(this.root_node);
		this.debug = this.state.debug;
		this.compressor = new MulCompression;
		this.state_history_arr = this.local_data_loader.load_str_arr('auto_buy_history_str', ["S"]);
		this.epoch_start_time = Date.now();
		this.original_map = new Map;
		this.dom_map = new Map;
		this.debug_arr = [];
		for(let i = 0;i < debug_id_syms.length;i++) {
			let val = debug_id_syms[i].deref();
			if(val && (<any>this)[val.sym]) {
				let obj1 = (this)[val.sym];
				let split_data = obj1.split(",");
				this.debug_arr.push(...split_data.map((e: string) => e.trim()));
			}
		}
		this.timeout_arr = this.local_data_loader.load_int_arr('auto_buy_timeout_str', (e: any) => {
			let src = [300];
			src.length = 16;
			let data_len = 1;
			while(src.at(-1) != src[0]) {
				src.copyWithin(data_len, 0);
				data_len *= 2;
			}
			return src;
		});
	}
	pre_init() {
		// find elements; find background_audio by id
		this.background_audio = document.querySelector("#background_audio");
		if(!this.background_audio) throw new Error("Missing expected element");
		// change the audio element's volume, and remove
		// the event listener that will change the volume
		this.background_audio.onloadeddata = null;
		this.background_audio.volume = AUDIO_ELEMENT_VOLUME;
		this.async_pre_init().then(() => {
			console.log('pre_init done');
		});
		this.dom_pre_init();
	}
	async async_pre_init() {
		if(!this.background_audio) throw new Error("Missing expected element");
		try {
			return this.background_audio.play();
		} catch(e) {
			is_in_ignored_from_src_fn = true;
			console.log("failed to play `#background_audio`, page was loaded without a user interaction(reload from devtools or F5 too)");
		}
		let instructions = SimpleStackVMParser.parse_instruction_stream_from_string(`
			this;push,target_obj;get;push,background_audio;get;push,play;
				call,int(2);
					push,then;
					push,%o;push,%o;
					call,int(2);
				// comments work
				/*-2 +1 multiline too, (not split across lines yet)*/
			drop;
			global;push,removeEventListener;push,click;this;
				call,int(2);
			drop
			`, [function() {console.log('play success')}, function(err: IBox) {console.log(err)}]);
		let handler = new EventHandlerVMDispatch(instructions, this);
		globalThis.addEventListener('click', handler);
		is_in_ignored_from_src_fn = false;
	}
	save_state_history_arr() {
		if(this.skip_save) return;
		localStorage.auto_buy_history_str = this.state_history_arr.join(",");
	}
	get_timeout_arr_data(forced_action: string) {
		if(forced_action == "RESET") return this.timeout_arr.map((e: number) => ~~(e / 4)).join(",");
		return this.timeout_arr.join(",");
	}
	save_timeout_arr() {
		let forced_action, action_count;
		let action_data = localStorage.auto_buy_forced_action;
		if(action_data) [forced_action, action_count] = action_data.split(",");
		localStorage.auto_buy_timeout_str = this.get_timeout_arr_data(forced_action);
		if(action_count !== void 0) {
			action_count = parseInt(action_count);
			if(Number.isFinite(action_count)) {
				if(action_count > 0) {
					localStorage.auto_buy_forced_action = [forced_action, action_count - 1];
				} else if(forced_action !== "NONE") {
					localStorage.auto_buy_forced_action = "NONE,0";
				}
			}
		}
	}
	dom_pre_init() {
		const css_display_style = `
			#state_log>div{width:max-content}
			#state_log{top:0px;width:30px;position:fixed;z-index:121;font-family:monospace;font-size:22px;color:lightgray}`;
		function style_sheet_gen(instance: {replace: (arg0: any) => void;}, args: any[]) {
			instance.replace(args[0]);
		}
		this.display_style_sheet = new CSSStyleSheet;
		this.display_style_sheet.replace(css_display_style);
		// dom element init; init history_element
		this.history_element = document.createElement("div");
		this.history_element.innerText = "?3";
		// init timeout_element
		this.timeout_element = document.createElement("div");
		this.timeout_element.innerText = "0";
		// init hours_played_element
		this.hours_played_element = document.createElement("div");
		this.hours_played_element.innerText = "0.00000 hours";
		// init percent_ratio_element
		this.percent_ratio_element = document.createElement("div");
		this.percent_ratio_element.innerText = 0..toFixed(2) + "%";
		// init percent_ratio_change_element
		this.percent_ratio_change_element = document.createElement("div");
		this.percent_ratio_change_element.innerText = 0..toExponential(3);
		// init state_log_element
		this.state_log_element = document.createElement("div");
		this.state_log_element.id = "state_log";
		// dom element attach
		// attach history_element
		this.state_log_element.append(this.history_element);
		// attach timeout_element
		this.state_log_element.append(this.timeout_element);
		// attach hours_played_element
		this.state_log_element.append(this.hours_played_element);
		// attach percent_ratio_element
		this.state_log_element.append(this.percent_ratio_element);
		// attach percent_ratio_change_element
		this.state_log_element.append(this.percent_ratio_change_element);
		// attach state_log_element
		document.body.append(this.state_log_element);
		// attach display_style_sheet
		this.adopt_styles(this.display_style_sheet);
		let create_state_log_arr = [
			[0, 'get', 'body'],
			[1, 'create', 'div', 'state_log', {id: 'state_log'}], [1, 'append'],
		];
		function retype_promise_helper(v: PromiseSettledResult<CSSStyleSheet>): v is PromiseFulfilledResult<CSSStyleSheet> {
			return v.status === 'fulfilled';
		}
		function retype_promise_settled_results(v: PromiseSettledResult<CSSStyleSheet>[]): PromiseFulfilledResult<CSSStyleSheet>[] {
			let out: PromiseFulfilledResult<CSSStyleSheet>[] = [];
			for(let i = 0;i < v.length;i++) {
				let cur = v[i];
				if(retype_promise_helper(cur)) {
					out.push(cur);
				}
			}
			return out;
		}
		let call_arg_arr: [] = [];
		let make_css_arr: (
			[0, 'push', null, ((...v:Promise<CSSStyleSheet>[]) => Promise<void>)] |
			[0, 'new', NewableFunction, [], CallableFunction, [string]] |
			[0, 'call', number] |
			[0, 'drop']
		)[] = [
			[0, 'push', null, async (...styles_promise_arr: Promise<CSSStyleSheet>[]) => {
				// @Hack: wait for any promise to settle
				const e = await Promise.allSettled(styles_promise_arr);
				let fulfilled = retype_promise_settled_results(e);
				let res = fulfilled.map(e_2 => e_2.value);
				this.adopt_styles(...res);
				let err = e.filter(e_3 => e_3.status != 'fulfilled');
				if(err.length > 0)
					console.log('promise failure...', ...err);
			}, ...call_arg_arr],
			[0, 'new', CSSStyleSheet, [],
				(obj: {replace: (arg0: any) => any;}, str: any) => obj.replace(str),
				[css_display_style]
			],
			[0, 'call', 2 + 1 + call_arg_arr.length],
			// drop the promise
			[0, 'drop'],
		];
		let raw_dom_arr = [
			...create_state_log_arr,
			[2, 'create', 'div', 'history', "?3"], [2, 'append'],
			[2, 'create', 'div', 'delay', "0"], [2, 'append'],
			[2, 'create', 'div', 'hours_played', "0.000 hours"], [2, 'append'],
			[2, 'create', 'div', 'ratio', 0..toFixed(2) + "%"], [2, 'append'],
			[2, 'create', 'div', 'ratio_change', 0..toExponential(3)], [2, 'append'],
			[1, 'drop'],
			[0, 'drop'],
			...make_css_arr
		];
		try {
			raw_dom_arr = [
				...create_state_log_arr,
				[0, 'drop'],
				...make_css_arr
			];
			this.build_dom_from_desc(raw_dom_arr, this.dom_map);
		} catch(e) {
			console.log(e);
		};
	}
	adopt_styles(...styles: CSSStyleSheet[]) {
		let dom_styles = document.adoptedStyleSheets;
		document.adoptedStyleSheets = [...dom_styles, ...styles];
	}
	build_dom_from_desc(raw_arr: string | any[], trg_map = new Map, dry_run = false) {
		let stack = [];
		let map = trg_map;
		if(dry_run) stack.push([0, "enable_dry_mode"]);
		for(let i = 0;i < raw_arr.length;i++) {
			let cur_item = raw_arr[i];
			let [depth, action, ...args] = cur_item;
			switch(action) {
				case 'get': {
					let cur_element, [query_arg] = args;
					switch(query_arg) {
						case 'body': cur_element = document.body; break;
						default: cur_element = document.querySelector(query_arg); break;
					}
					stack.push([depth, "push", new DomValueBox('get', cur_element)]);
				} break;
				case 'new': {
					const [_class, construct_arg_arr, callback, arg_arr] = args;
					stack.push([depth, "push", null, callback, ...construct_arg_arr, _class]);
					stack.push([depth, "construct", 1 + construct_arg_arr.length]);
					stack.push([depth, "push", ...arg_arr]);
					stack.push([depth, "call", 3 + arg_arr.length]);
				} break;
				case 'create': {
					const [element_type, name, content] = args;
					let cur_element = document.createElement(element_type);
					if(typeof content == 'string') {
						cur_element.innerText = content;
					} else if(typeof content == 'object') {
						if(content.id) cur_element.id = content.id;
					} else {
						console.log('bad typeof == %s for content in build_dom; content=%o', typeof content, content);
						console.info("Info: case 'create' args are", element_type, name);
					}
					map.set(name, cur_element);
					stack.push([depth, "push", new DomValueBox('create', cur_element)]);
				} break;
				case 'append': {
					// peek at the return stack, up 1 depth
					stack.push([depth, "peek", depth - 1, 0]);
					stack.push(cur_item);
				} break;
				case 'drop':
				case 'call':// push the item
				case 'push': stack.push(cur_item); break;
				default: {
					console.log('might need to handle', action);
					debugger;
				} break;
			}
			if(this.debug_arr.includes('build_dom_from_desc')) console.log('es', stack.at(-1));
		}
		let [left_stack, tree] = this.parse_dom_desc(stack);
		if(left_stack.length > 0) {
			console.assert(false, 'failed to parse everything (parse tree probably has errors)');
		}
		this.apply_dom_desc(tree);
	}
	parse_dom_desc(input_stack: string | any[]) {
		let stack: any[][] = [];
		let tree = [];
		for(let x = 0, i = 0;i < input_stack.length;i++) {
			let cur_stack = input_stack[i];
			let [y, ...item] = cur_stack;
			if(this.debug_arr.includes('parse_dom_desc')) console.log(item);
			while(y > x) {
				stack.push(tree);
				tree = [];
				x++;
			}
			while(y < x) {
				let prev = tree;
				tree = <any>stack.pop();
				tree.push([x, prev]);
				x--;
			}
			tree.push([y, item]);
		}
		return [stack, tree];
	}
	log_if(tag: string, ...log_args: (string | number | any[])[]) {
		if(this.debug_arr.includes(tag)) {
			console.log(...log_args);
		}
	}
	get_logging_level(tag: string, level = LOG_LEVEL_VERBOSE) {
		if(this.debug_arr.includes(tag)) {
			return level - 1;
		}
		return level;
	}
	/* 		get [next_debug_id()](){
		return 'apply_dom_desc';
	} */
	apply_dom_desc(tree: any) {
		this.run_dom_desc(tree);
	}
	run_dom_desc(tree: string | any[], stack: (string | number)[][] = [], cur_depth = 0, items: any[] = [], depths: number[] = []) {
		for(let i = 0;i < tree.length;i++) {
			let cur = tree[i];
			switch(cur[0] - cur_depth) {
				case 1: {
					this.log_if('apply_dom_desc', 'rdc stk');
					stack.push(['children', items.length - 1, cur]);
				} break;
				case 0: {
					items.push(cur[1]);
					depths.push(cur[0]);
				} break;
				default: {
					console.assert(false, 'handle depth change in apply_dom_desc');
					this.log_if('apply_dom_desc', cur[0] - cur_depth);
				}
			}
		}
		if(stack.length === 0) return [items, depths];
		const [tag, items_index, [data_depth, data]] = <any>stack.pop();
		let log_level = this.get_logging_level('apply_dom_desc');
		l_log_if(log_level, tag, items[items_index], data_depth, data);
		let deep_res = this.run_dom_desc(data, stack, cur_depth + 1);
		const ret_items = items.slice();
		let off = 1;
		ret_items.splice(items_index + off++, 0, ['exec', deep_res[0]]);
		this.log_if('apply_dom_desc', deep_res[0], deep_res[1]);
		this.log_if('apply_dom_desc', ret_items, depths, stack);
		let builder_vm = new DomBuilderVM(ret_items);
		builder_vm.run();
		return [ret_items, depths];
	}
	init_dom() {
		const font_size_px = 22;
		let t = this;
		// general init
		this.state_history_arr_max_len = Math.floor(document.body.getClientRects()[0].width / (font_size_px * 0.55) / 2.1);
		// dom element init; init history_element
		this.history_element?.addEventListener('click', new EventHandlerDispatch(this, this.history_element_click_handler));
		// init timeout_element
		if(this.timeout_element) this.timeout_element.innerText = this.timeout_arr[0];
		// init hours_played_element; init percent_ratio_element
		this.percent_ratio_element?.addEventListener('click', function() {
			t.state.reset();
		});
		// init percent_ratio_change_element; init state_log_element
		if(this.state_log_element) this.state_log_element.style.fontSize = font_size_px + "px";
		// event listeners; window unload
		window.addEventListener('unload', function() {
			t.save_state_history_arr();
			t.save_timeout_arr();
		});
	}
	global_init() {
		let cur_this: AutoBuy = this;
		if((window as any).g_auto_buy && (window as any).g_auto_buy !== cur_this) {
			(window as any).g_auto_buy.destroy();
		}
		(window as any).g_auto_buy = this;
	}
	destroy() {
		this.root_node.destroy();
		for(let i = 0;i < this.cint_arr.length;i += 2) {
			let cint_item = this.cint_arr[i];
			switch(cint_item[0]) {
				case 1: {
					clearTimeout(cint_item[1]);
				} break;
				case 2: {
					clearInterval(cint_item[1]);
				} break;
				default: {
					console.assert(false, 'cant destroy cint item (%o)', cint_item);
				} break;
			}
		}
	}
	update_dom() {
		if(!this.hours_played_element) return;
		if(!this.percent_ratio_element) return;
		if(!this.percent_ratio_change_element) return;
		if(!this.history_element) return;
		if(!this.state_history_arr_max_len) return;
		// spell:words timeplayed
		this.hours_played_element.innerText = ((window.timeplayed / 30) / 60).toFixed(7) + " hours";
		let last_ratio = this.state.ratio * 100;
		this.state.update();
		let cur_ratio = this.state.ratio * 100;
		this.percent_ratio_element.innerText = cur_ratio.toFixed(2) + "%";
		let ratio_diff = cur_ratio - last_ratio;
		let extra_diff_char = "+";
		if(ratio_diff < 0) extra_diff_char = '';
		this.percent_ratio_change_element.innerText = extra_diff_char + ratio_diff.toExponential(3);
		this.history_element.innerText = array_sample_end(this.state_history_arr, this.state_history_arr_max_len).join(" ");
		this.next_timeout(this.update_dom, 125, 'update_dom', true);
	}
	init() {
		this.next_timeout(this.init_impl, 210 - 10, 'init', true);
	}
	dom_reset() {
		this.update_dom();
	}
	replace_timeplayed_timer() {
		//spell:words secondinterval
		clearInterval(window.secondinterval);
		let rate = 66 / (2110 - 110);
		let time_base = performance.now();
		window.secondinterval = setInterval(function() {
			let real_time = performance.now();
			let time_diff = real_time - time_base;
			time_base = real_time;
			let real_rate = time_diff / (2300 - 300);
			window.timeplayed += real_rate;
		}, 66);
		this.root_node.append_raw(setInterval(function() {
			window.doc.title = window.rounding(window.totalAtome, false, 1).toString() + " atoms";
			let atomsaccu = window.doc.getElementById('atomsaccu');
			let timeplayed_e = window.doc.getElementById('timeplayed');
			let presnbr_e = window.doc.getElementById('timeplayed');
			if(!atomsaccu) return;
			if(!timeplayed_e) return;
			if(!presnbr_e) return;
			//spell:words atomsaccu presnbr
			atomsaccu.innerHTML = window.rounding(window.atomsaccu, false, 0);
			timeplayed_e.innerHTML = (Math.round(window.timeplayed / 30) / 60).toFixed(2) + " hours";
			presnbr_e.innerHTML = "<br>" + (window.calcPres() * 100).toFixed(0) + " % APS boost";
		}, (230 - 300)), false);
	}
	init_impl() {
		let t = this;
		this.global_init();
		this.init_dom();
		this.state.init();
		this.update_dom();
		this.main();
		this.original_map.set('lightreset', window.lightreset);
		window.lightreset = lightreset_inject;
		window.specialclick = specialclick_inject;
		if(window.secondinterval) {
			this.replace_timeplayed_timer();
		}
	}
	state_history_clear_for_reset() {
		this.state_history_arr = ["R"];
		localStorage.auto_buy_history_str = "R";
	}
	state_history_append(value: any, silent = false) {
		Promise.resolve().then(this.async_compress.bind(this));
		this.epoch_len++;
		if(silent) return;
		let last = this.state_history_arr.at(-1);
		this.state_history_arr.push(value);
		if(this.state.debug) console.log('history append', last, value);
		while(this.state_history_arr.length > 120) this.state_history_arr.shift();
	}
	history_element_click_handler(event: any) {
		this.root_node.destroy();
		this.dom_reset();
		this.reset();
	}
	reset() {
		let timeout = 3000;
		if(this.extra < timeout) timeout = this.extra;
		this.next_timeout(this.main, timeout, '@');
	}
	calc_timeout_extra() {
		while(this.timeout_arr.length > 60) this.timeout_arr.shift();
		let max = 0;
		let total = 0;
		for(var i = 0;i < this.timeout_arr.length;i++) {
			total += this.timeout_arr[i];
			max = Math.max(this.timeout_arr[i], max);
		};
		const val = total / this.timeout_arr.length;
		let num = max / val;
		this.last_value ??= num;
		let diff = this.last_value - num;
		if(diff > .1 || diff < -.1) {
			this.last_value = num;
			console.log('timeout_arr num', num, 'differing from last by', diff);
		}
		return this.round(val);
	}
	is_epoch_over() {
		let epoch_diff = Date.now() - this.epoch_start_time;
		return epoch_diff > 60 * 5 * 1000;
	}
	main() {
		function r(v: number) {
			return ~~v;
		}
		let loss_rate = this.unit_promote_start();
		if(loss_rate > 0 || loss_rate < 0) {
			console.log('loss', r(loss_rate * 100 * 10) / 10);
		}
		if(this.maybe_run_reset()) return;
		if(this.pre_total != window.totalAtome) return this.step_iter_start();
		this.iter_count = 0;
		if(Math.random() < 0.005) return this.rare_begin();
		this.faster_timeout();
	}
	async maybe_async_reset() {
		let loss_rate = this.unit_promote_start();
		if(this.maybe_run_reset()) return [true, loss_rate];
		return [false, loss_rate];
	}
	async main_async() {
		for(this.iter_count = 0;;) {
			if(this.iter_count < 6) await this.normal_decrease_async();
			else await this.large_decrease_async();
			let [quit, loss_rate] = await this.maybe_async_reset();
			if(quit) return;
			if(loss_rate > 0.08) continue;
			if(this.pre_total == window.totalAtome) break;
		}
		if(Math.random() < 0.005) this.rare_begin();
		else this.faster_timeout_use_async();
	}
	large_decrease_async(): Promise<void> {
		throw new Error("Method not implemented.");
	}
	normal_decrease_async(): Promise<void> {
		throw new Error("Method not implemented.");
	}
	step_iter_start() {
		if(this.iter_count > 6) return this.large_decrease();
		else return this.normal_decrease();
	}
	async fast_unit() {
		let running = true;
		while(running) {
			this.unit_promote_start();
			if(this.pre_total == window.totalAtome) break;
			let promise = this.async_timeout_step();
			await promise;
		}
		this.async_timeout_step_finish();
	}
	async_timeout_step(): Promise<void> {
		throw new Error("Method not implemented.");
	}
	unit_promote_start() {
		this.extra = this.calc_timeout_extra();
		this.pre_total = window.totalAtome;
		this.do_unit_promote();
		let money_diff = this.pre_total - window.totalAtome;
		let loss_rate = money_diff / this.pre_total;
		if(this.pre_total != window.totalAtome && this.debug) {
			let log_args = [];
			let percent_change = (loss_rate * 100).toFixed(5);
			let money_str = window.totalAtome.toExponential(3);
			log_args.push(this.iter_count);
			log_args.push(percent_change);
			log_args.push(money_str);
			console.log(...log_args);
		}
		this.iter_count += 1;
		return loss_rate;
	}
	async async_next_timeout_step() {
		this.do_timeout_dec([1.006], 10);
		return this.next_timeout_async(this.extra, ':');
	}
	async_timeout_step_finish() {
		this.do_timeout_dec([1.006], 10);
		this.next_timeout(this.main, this.extra, '$');
	}
	large_decrease() {
		this.do_timeout_dec([1.008], 10);
		this.next_timeout(this.main, this.extra, '!');
	}
	normal_decrease() {
		this.do_timeout_dec([1.006], 10);
		this.next_timeout(this.main, this.extra, '-');
	}
	rare_begin() {
		this.do_timeout_inc([1.008, 1.03], 10);
		this.next_timeout(this.initial_special, this.extra, '<');
	}
	faster_timeout_use_async() {
		this.do_timeout_inc([1.007, 1.01], 50);
		this.next_timeout(this.main_async, this.extra, 'A');
	}
	faster_timeout() {
		this.do_timeout_inc([1.007, 1.01], 50);
		this.next_timeout(this.main, this.extra, '+');
	}
	get_timeout_change(pow_base: number, pow_num: number, div: number) {
		let pow_res = Math.pow(pow_base, pow_num);
		let res = this.extra * pow_res;
		return res / div;
	}
	update_timeout_inc(change: number) {
		if(window.__testing__) {
			return;
		}
		let value = this.round(this.extra + change);
		this.timeout_arr.push(value);
	}
	update_timeout_dec(change: number) {
		if(window.__testing__) {
			return;
		}
		let value = this.round(this.extra - change);
		if(value < 25) value = 25;
		this.timeout_arr.push(value);
	}
	round(value: number) {
		return ~~value;
	}
	do_timeout_dec(pow_terms: any[], div: number) {
		let change = this.get_timeout_change(pow_terms[0], Math.log(window.totalAtome), div);
		this.update_timeout_dec(change);
	}
	do_timeout_inc(pow_terms: any[], div: number) {
		let iter_term = Math.pow(pow_terms[1], this.iter_count);
		let change = this.get_timeout_change(pow_terms[0], Math.log(window.totalAtome), div);
		this.update_timeout_inc(change * iter_term);
	}
	async next_timeout_async(timeout: number, char: string, silent = false) {
		if(!silent && this.timeout_element) this.timeout_element.innerText = timeout.toString();
		this.state_history_append(char, silent);
		let node = new AsyncTimeoutNode(timeout);
		this.root_node.append_child(node);
		let att = new AsyncTimeoutTarget(char);
		let promise = node.start_async(att);
		await promise;
	}
	next_timeout(trg_fn: () => void, timeout: number, char: string, silent = false) {
		let node = new AsyncTimeoutNode(timeout);
		this.root_node.append_child(node);
		node.start(new TimeoutTarget(this, trg_fn, char));
		if(!silent && this.timeout_element) this.timeout_element.innerText = timeout.toString();
		this.state_history_append(char, silent);
	}
	do_unit_promote() {
		do_auto_unit_promote();
	}
	slow_final() {
		this.next_timeout(this.main, this.extra, '$');
	}
	bonus() {
		window.bonusAll();
		this.fast_unit();
	}
	special_timeout() {
		this.next_timeout(this.special, this.extra, '^');
	}
	is_special_done(special_buyable: {done: any; cost: number;}) {
		return !special_buyable.done && special_buyable.cost < window.totalAtome;
	}
	next_special() {
		return window.allspec.findIndex(this.is_special_done);
	}
	do_special() {
		let ret = false;
		for(let index = this.next_special();;index = this.next_special()) {
			if(index > -1) {
				window.specialclick(index);
				ret = true;
			} else break;
		}
		return ret;
	}
	special() {
		if(this.do_special()) this.next_timeout(this.special, this.extra, '^');
		else this.next_timeout(this.bonus, this.extra, '#');
	}
	initial_special() {
		this.next_timeout(this.special, this.extra, '>');
	}
	maybe_run_reset() {
		let count = 0;
		count += (this.extra > 15 * 1000) as unknown as number;
		count += this.state.ratio > 1 as unknown as number;
		count += this.is_epoch_over() as unknown as number;
		switch(count) {
			case 0:
			case 1: break;
			default: console.log('mrc', count);
		}
		if(this.state.ratio > 1 && this.is_epoch_over() || this.extra > 15 * 1000) {
			this.next_timeout(this.reset_timeout_trigger, 5 * 1000, 'reset_timeout_begin');
			return true;
		}
		return false;
	}
	reset_timeout_init() {
		if(this.background_audio) {
			this.background_audio.muted = !this.background_audio.muted;
		}
		this.next_timeout(this.reset_timeout_trigger, 60 * 2 * 1000, 'reset_timeout');
	}
	reset_timeout_trigger() {
		if(this.background_audio) {
			this.background_audio.muted = !this.background_audio.muted;
		}
		this.next_timeout(this.reset_timeout_start, 60 * 2 * 1000, 'reset_timeout');
	}
	reset_timeout_start() {
		this.next_timeout(this.reset_timeout_run, 60 * 1000, 'reset_timeout');
	}
	reset_timeout_run() {
		window.lightreset();
	}
}
function do_auto_unit_promote() {
	let arUnit=window.arUnit;
	let Get_Unit_Type=window.Get_Unit_Type;
	let getUnitPromoCost=window.getUnitPromoCost;
	let Find_ToNext=window.Find_ToNext;
	var out = [], maxed = [];
	for(var k = 0;k < arUnit.length;k++) {
		var afford = false;
		if(arUnit[k][16] == true || k == 0) {
			var type = Get_Unit_Type(k);
			var tmp = getUnitPromoCost(k);
			var cost = tmp;
			var next = Find_ToNext(k);
			if(next < 0) {maxed[k] = true};
			for(var i = 1;i <= 100;i++) {
				if(window.totalAtome >= cost) {
					tmp = tmp + (tmp * arUnit[k][3]) / 100;
					var tar = (arUnit[k][4] * 1) + i;
					var a = window._targets.indexOf(tar);
					var reduction = 1;
					if(a > -1 && tar <= 1000) {
						var b = true;
						for(var k2 in type[2]) {
							var v2 = type[2][k2]
							if(v2 != k && arUnit[v2][4] < tar) {
								b = false;
							}
						}
						if(b) {
							var c = window._targets_achi.indexOf(window.totalAchi() + 1);
							if(c > -1) {
								reduction *= (1 - ((c + 1) * 0.01));
							}
							reduction *= 1 - ((a + 1) * 0.01);
						}
					}
					tmp *= reduction;
					cost += tmp;
				} else {
					break
				}
				if(i == next || (maxed[k] && i == 100)) {
					afford = true;
				}
			}
			if(afford) {
				out[k] = true;
			} else {
				out[k] = false;
			}
		}
	}
	let res = out.lastIndexOf(true);
	if(res < 0) return;
	if(maxed[res]) {
		for(var y = 0;y < 100;y++) {
			window.mainCalc(res);
		}
	} else {
		window.tonext(res);
	}
}
const auto_buy_obj = new AutoBuy;
export class AsyncTrigger {
	m_set_flag: boolean;
	trigger_handler: null;
	promise_set;
	m_set_result: (value: number) => void;
	m_set_error: PromiseExecutorRejectCallback;
	m_can_notify: boolean;
	m_notify_result: null | ((value: void | PromiseLike<void>) => void);
	m_notify_error: null | PromiseExecutorRejectCallback;
	constructor() {
		this.notify_promise = null;
			this.m_set_flag = true;
			this.trigger_handler = null;
			this.m_can_notify = false;
			this.m_notify_result=null;
			this.m_notify_error=null;
			let accept_fn:((value: any) => void)|null=null;
			let reject_fn:((reason?: any) => void)|null=null;
			this.promise_set = new Promise((accept, reject) => {
				accept_fn = accept;
				reject_fn = reject;
			});
			if(accept_fn && reject_fn){
				this.m_set_result = accept_fn;
				this.m_set_error = reject_fn;
			} else {
				this.m_set_result = this.default_accept.bind(this);
				this.m_set_error = this.default_reject.bind(this);
			}
			this.m_set_flag = false;
	}
	default_accept(value:any){
		return value;
	}
	default_reject(error:any){
		throw error;
	}
	set(cnt: number) {
		if(!this.m_set_flag && this.m_set_result) {
			this.m_set_result(cnt);
			this.m_set_flag = true;
		}
	}
	set_error(opt_error: any) {
		if(!this.m_set_flag && this.m_set_error) {
			if(opt_error) this.m_set_error(opt_error);
			else this.m_set_error(null);
		}
	}
	async wait() {
		let ret = this.promise_set;
		return ret;
	}
	notify(cnt: any) {
		if(this.m_can_notify && this.m_notify_result) {
			this.m_notify_result(cnt);
			this.m_can_notify = false;
		}
	}
	notify_error(error: any) {
		if(this.m_can_notify && this.m_notify_error) {
			this.m_notify_error(error);
			this.m_can_notify = false;
		}
	}
	notify_promise: Promise<void> | null;
	async notified() {
		let t = this;
		this.notify_promise = new Promise(function(accept, reject) {
			t.m_notify_result = accept;
			t.m_notify_error = reject;
		});
		this.m_can_notify = true;
	}
}
function map_to_tuple(this: never, e: string, i: string | number) {
	return [e, this[i]];
}
function to_tuple_arr(keys: string[], values: number[]) {
	return keys.map(map_to_tuple, values);
}
function promise_set_timeout(timeout: number | undefined, a: TimerHandler) {
	setTimeout(a, timeout);
}
function do_async_wait(timeout: never) {
	return new Promise(promise_set_timeout.bind(null, timeout));
}
void do_async_wait;
function array_sample_end(arr: string[], rem_target_len: number) {
	arr = arr.slice(-300);
	let rem_len = char_len_of(arr);
	while(rem_len > rem_target_len) {
		let cur = arr.shift();
		if(!cur) break;
		rem_len -= cur.length + 1;
	}
	return arr;
}
function char_len_of(arr: string[]) {
	return arr.reduce((a: number, b: string) => a + b.length, 0) + arr.length;
}
function lightreset_inject() {
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
function specialclick_inject(that: number) {
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
class ProxyHandlers {
	weak_root: WeakRef<never | KeepSome>;
	count_arr: number[];
	constructor(root: never) {
		this.weak_root = new WeakRef(root);
		this.count_arr = [0];
	}
	so_init() {
		let val = Array(12).fill((idx: number) => {
			if(idx > window.da.length) return window.da.at(-1)(idx - 1);
			return window.da[idx - 1](idx - 1);
		});
		window.da = [() => window.g_proxy_state.hand.stack_overflow_check(), ...val];
	}
	stack_overflow_check() {
		window.g_proxy_state.hand.count_arr[0]++;
		if(window.g_proxy_state.hand.count_arr[0] < window.g_proxy_state.hand.count_arr[1]) {
			return window.g_proxy_state.hand.stack_overflow_check();
		}
		return window.g_proxy_state.hand.count_arr[0];
	}
	generic(type: string, call_args: any, from: any[]) {
		let keep_vec = this.weak_root.deref();
		if(keep_vec === null) {
			console.log('ProxyHandlers reset KeepSome after gc collect');
			keep_vec = new KeepSome;
			this.weak_root = new WeakRef(keep_vec);
		}
		if(keep_vec) keep_vec.push((<any>from).concat([null, type, 1, call_args]));
	}
	set_(call_args: [target: object, propertyKey: PropertyKey, value: any, receiver?: any], from: never) {
		this.generic('set', call_args, from);
		return Reflect.set(...call_args);
	}
	get_(call_args: [target: object, propertyKey: PropertyKey, receiver?: any], from: never) {
		this.generic('get', call_args, from);
		return Reflect.get(...call_args);
	}
	apply_(call_args: [target: Function, thisArgument: any, argumentsList: ArrayLike<any>], from: never) {
		this.generic('apply', call_args, from);
		return Reflect.apply(...call_args);
	}
	defineProperty_(call_args: [target: object, propertyKey: PropertyKey, attributes: PropertyDescriptor], from: never) {
		this.generic('defineProperty', call_args, from);
		return Reflect.defineProperty(...call_args);
	}
	getOwnPropertyDescriptor_(call_args: [target: object, propertyKey: PropertyKey], from: never) {
		this.generic('getOwnPropertyDescriptor', call_args, from);
		return Reflect.getOwnPropertyDescriptor(...call_args);
	}
}
void ProxyHandlers;
class KeepSome {
	array: (number | string)[][];
	constructor() {
		this.array = [];
	}
	push(value: number | string) {
		let set_index = 0;
		let ret = this.push_at(set_index, value);
		while(this.array[set_index].length > 50) {
			let sr = this.array[set_index].shift();
			if(!sr) throw new Error("This should not happen (popped from an array with length > 50)");
			value = sr;
			if(Math.random() > 0.9) {
				set_index++;
				this.push_at(set_index, value);
				console.log('psp', 1);
				let off = 0;
				while(this.array[set_index - off].length < 25) {
					let val = this.array[set_index - off - 1].shift();
					if(!val) break;
					this.array[set_index - off].push(val);
				}
				off++;
				if(set_index - off < 0) continue;
				console.log('psp', 2);
				while(this.array[set_index - off].length < 40) {
					let val = this.array[set_index - off - 1].shift();
					if(!val) break;
					this.array[set_index - off].push(val);
				}
				off++;
				if(set_index - off < 0) continue;
				console.log('psp', 3);
				while(this.array[set_index - off].length < 40) {
					let val = this.array[set_index - off - 1].shift();
					if(!val) break;
					this.array[set_index - off].push(val);
				}
				off++;
				if(set_index - off < 0) continue;
				console.log('psp', 4);
				while(this.array[set_index - off].length < 40) {
					let val = this.array[set_index - off - 1].shift();
					if(!val) break;
					this.array[set_index - off].push(val);
				}
			}
			if(this.array[set_index].length <= 50 && set_index > 0) {
				set_index--;
			}
		}
		return ret;
	}
	push_at(index: number, value: number | string) {
		while(index >= this.array.length) {
			this.array.push([]);
		}
		this.array[index].push(value);
	}
	push_va(...a: (number | string)[]) {
		for(let x of a) {
			this.push(x);
		}
	}
}
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