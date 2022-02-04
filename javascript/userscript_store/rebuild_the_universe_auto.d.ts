// ==UserScript==
// @name		 rebuild the universe automation
// @namespace	http://tampermonkey.net/
// @version	  0.1
// @description  try to take over the world!
// @author	   You
// @match		http://rebuildtheuniverse.com/*
// @match		http://rebuildtheuniverse.com
// @match		https://rebuildtheuniverse.com/*
// @match		https://rebuildtheuniverse.com
// @run-at	   document-start
// @grant		none
// ==/UserScript==
// spell:words deref
// spell:words lazyload
// spell:words adsbygoogle deinit totalAtome _targets_achi totalAchi tonext atomepersecond lightreset lightgray
/* eslint-disable no-undef,no-lone-blocks,no-eval */
interface WeakRef<T extends object> {
	readonly [Symbol.toStringTag]: "WeakRef";

	/**
	 * Returns the WeakRef instance's target object, or undefined if the target object has been
	 * reclaimed.
	 */
	deref(): T | undefined;
}

type TimerTypeTag = 1 | 2;
declare namespace Remote {
	type TimerTypeTag = 1 | 2;
	class RemoteTimerState {}
	class RemoteTimer {
		m_remote_to_local_timer_state_map: Map<any, any>;
		m_api_info: typeof RemoteTimerApiInfo;
		constructor(api_info: typeof RemoteTimerApiInfo);
		fire(remote_id: number): void;
		set(type_tag: TimerTypeTag, remote_id: number, delay: number): number;
		verify_timer_type_tag(type_tag: TimerTypeTag): void;
		verify_timer_state(local_state: RemoteTimerState, remote_id: number): void;
		validate_timer_type_tag(type_tag: TimerTypeTag): boolean;
		validate_timer_state(local_state: RemoteTimerState): boolean;
		clear(remote_id: number): void;
		do_clear(clear_msg: {v: number, t: number}): void;
	}
	class RemoteWorkerState {
		m_timer: RemoteTimer;
		unique_script_id: number;
		set_timer(timer: RemoteTimer): void;
		timer_set(timer_type_tag: TimerTypeTag, remote_id: number, timeout: number): number;
		do_timer_clear(timer_clear_msg: {t: number, v: number}): void;
	}
	function timer_nop(): void;
	function fire_timer(timer: RemoteTimer, remote_id: number): void;
	let remote_worker_state: RemoteWorkerState;
	var RemoteTimerApiInfo: {
		async_reply_msg_id: 1,
		timer_reply_msg_id: 2,
		reply_msg_id: 100,
		fire_single_msg_id: 101,
		fire_repeating_msg_id: 102,
		remote_reply_msg_id: 200,
		worker_update_code: 201,
		async_worker_ready_msg_id: 202,
		set_single_msg_id: 203,
		set_repeating_msg_id: 204,
		clear_single_msg_id: 205,
		clear_repeating_msg_id: 206,
		clear_any_msg_id: 207,
		set_single: "setTimeout",
		set_repeating: "setInterval",
		clear_single: "clearTimeout",
		clear_repeating: "clearInterval"
	};
}

export const TIMER_SINGLE = 1;
export const TIMER_REPEATING = 2;
export const TIMER_TAG_COUNT = 3;
export const AUDIO_ELEMENT_VOLUME = 0.58;
declare class DocumentWriteList {
	list: any[];
	attached: boolean;
	end_symbol: Symbol;
	document_write: Document['write'];
	attached_document: Document;
	document_write_proxy: Document['write'];
	write(args_spread: [Document['write'], Document, string[]]): void;
	attach_proxy(document: Document): void;
	destroy(should_try_to_destroy: true): void;
}
declare class UniqueIdGenerator {
	m_current: number;
	set_current(current_value: number): void
	current(): number;
	next(): number;
}
declare class PromiseExecutorHandle {
	m_closed: boolean;
	m_accept: any;
	m_reject: any;
	constructor(accept: (value: void) => void, reject: (reason?: any) => void);
	accept(value: void): void;
	reject(error: any): void;
	closed(): boolean;
	close(): void;
}
declare namespace StringTuringTools {
	type First<T extends string> = T extends `${infer U}${string}` ? U : ''
	type RemoveFirst<T extends string> = T extends `${string}${infer U}` ? U : ''

	type Reverse<U extends string> = U extends '' ? '' : `${Reverse<RemoveFirst<U>>}${First<U>}`

	type Last<T extends string> = First<Reverse<T>>
	type RemoveLast<T extends string> = Reverse<RemoveFirst<Reverse<T>>>
	type Data = 'abcd';
	type RevData = Reverse<Data>;
	type T1 = Reverse<RemoveFirst<Data>>;
}
declare namespace ArrayTuringTools {
	type FirstStr<T extends string> = T extends `${infer U}${string}` ? U : ''
	type RemoveFirstStr<T extends string> = T extends `${string}${infer U}` ? U : ''
	type First<T extends any[]> = T extends [infer U, ...any[]] ? U : []
	type RemoveFirst<T extends any[]> = T extends [any, ...infer U] ? U : []
	type ReverseStr<U extends string> = U extends '' ? '' : `${ReverseStr<RemoveFirstStr<U>>}${FirstStr<U>}`
	type ReverseArr<U extends any[]> = U extends [] ? [] : [...Reverse<RemoveFirst<U>>, First<U>];

	type Reverse<U extends any[] | string> = U extends string ? ReverseStr<U> : U extends any[] ? ReverseArr<U> : never;
	type Data = [1, 2, 3, 4];
	type RevDataStr = Reverse<"Data">;
	type RevDataArr = Reverse<Data>;
}
// STRING MANIPULATION TOOLS
type First<T extends string> = T extends `${infer U}${string}` ? U : ''
type RemoveFirst<T extends string> = T extends `${string}${infer U}` ? U : ''

type Reverse<U extends string> = U extends '' ? '' : `${Reverse<RemoveFirst<U>>}${First<U>}`

type Last<T extends string> = First<Reverse<T>>
type RemoveLast<T extends string> = Reverse<RemoveFirst<Reverse<T>>>
type ReturnValue<T> = T extends (...a: any[]) => infer U ? U : never;
type ReturnValueV<T> = T extends (...a: any[]) => infer U ? U : never;

declare var atomepersecond: number;
declare var totalAtome: number;
declare var prestige: number;

interface ElementCSSInlineStyle {
	style: CSSStyleDeclaration;
}

// declare var window:Window;
declare function timer_nop(): void;
declare class WorkerState {
	rejected: boolean;
	valid: boolean;
	connected: boolean;
	worker_code: Blob;
	timer: Timer;
	executor_handle: PromiseExecutorHandle;
	worker: Worker;
	worker_url: string;
	constructor(worker_code_blob: Blob, timer: Timer, executor_handle: PromiseExecutorHandle);
	init(): void;
	set_executor_handle(handle: PromiseExecutorHandle): void;
	on_result(result: any): void;
	dispatch_message(result: any): void;
	postMessage(data: any): void;
	static has_global_state(): boolean;
	static has_old_global_state_value(worker_state_value: WorkerState): boolean;
	static equals_global_state(worker_state_value: WorkerState): boolean;
	static maybe_delete_old_global_state_value(worker_state_value: WorkerState): void;
	static maybe_delete_old_global_state(): boolean;
	static delete_old_global_state(): void;
	static destroy_old_worker_state(worker_state_value: WorkerState, before_destroy_call_name: ""): void;
	static get_global_state(): void;
	static set_global_state(worker_state_value: WorkerState): void;
	static delete_global_state(): void;
	static get global_state_key(): "g_worker_state";
	destroy(): void;
}
declare class TimerStateData {
	type: TimerTypeTag;
	active: boolean;
	target_function: Function;
	target_arguments: any[];
}
type message203 = {
	t: 203,
	v: {
		t: number,
		v: number
	}
};
type message204 = {
	t: 204,
	v: {
		t: number,
		v: number
	}
};
type message205 = {
	t: 205,
	v: number
};
type message206 = {
	t: 206,
	v: number
};
declare class Timer {
	id_generator: UniqueIdGenerator;
	m_remote_id_to_main_state_map: Map<number, TimerStateData>;
	weak_worker_state: WeakRef<WorkerState>;
	m_api_map: Map<
		"setTimeout" | "setInterval" | "clearTimeout" | "clearInterval",
		typeof setTimeout | typeof setInterval | typeof clearInterval | typeof clearTimeout
	>;
	m_api_info: TimerApiInfo;
	base_id: number;
	constructor(id_generator: UniqueIdGenerator, api_info: TimerApiInfo);
	set_worker_state(worker_state_value: WorkerState): void;
	verify_timer_type_tag(type_tag: TimerTypeTag): void;
	verify_timer_state(main_state: TimerStateData, remote_id: number): void;
	validate_timer_type_tag(type_tag: TimerTypeTag): boolean;
	validate_timer_state(main_state: TimerStateData): boolean;
	fire(timer_mode_tag: TimerTypeTag, remote_id: number): void;
	set(timer_mode_tag: TimerTypeTag, handler: TimerHandler, timeout: number, target_arguments: any[]): number;
	is_main_state_stored_by_id(remote_id: number): boolean;
	get_main_state_by_id(remote_id: number): TimerStateData;
	store_main_state_by_id(remote_id: number, main_state: TimerStateData): void;
	delete_main_state_by_id(remote_id: number): void;
	main_state_entries(): IterableIterator<[number, TimerStateData]>;
	on_result(timer_result_msg: {t: 205 | 206, v: number}): void;
	force_clear(timer_mode_tag: TimerTypeTag, remote_id: number): ReturnValue<typeof this.clear>;
	clear(timer_mode_tag: TimerTypeTag, remote_id: number): void;
	destroy(): void;
}
declare class VerifyError extends Error {
	name: "VerifyError";
	constructor(message: string);
}
declare function VERIFY(assert_result: boolean, assert_message: string): void;
declare function verify_worker_code_callback(verify_obj: {}): void;
type TimerApiInfo = {
	set_single_msg_id: 203,
	set_repeating_msg_id: 204,
	clear_single_msg_id: 205,
	clear_repeating_msg_id: 206,
	set_single: "setTimeout",
	clear_single: "clearTimeout",
	set_repeating: "setInterval",
	clear_repeating: "clearInterval"
};
declare function create_worker_state(worker_code_blob: Blob, timer: Timer, executor_handle: PromiseExecutorHandle): WorkerState;
declare const setTimeout_global: typeof setTimeout;
declare function remoteSetTimeout(handler: TimerHandler, timeout?: number, ...target_arguments: any[]): number;
declare const clearTimeout_global: typeof clearTimeout;
declare function remoteClearTimeout(id?: number): void;
declare const setInterval_global: typeof setInterval;
declare function remoteSetInterval(handler: TimerHandler, timeout?: number, ...target_arguments: any[]): number;
declare const clearInterval_global: typeof clearInterval;
declare function remoteClearInterval(id?: number): void;
declare function move_timers_to_worker_promise_executor(executor_accept: (value: void) => void, executor_reject: (reason?: any) => void): {
	get(): WorkerState;
};
declare function remove_element_callback(e: HTMLScriptElement): void;
declare function remove_bad_dom_script_element(): void;
declare class EventHandlerDispatch {
	target_obj: any;
	target_name: string;
	constructor(target_obj: any, target_name: string);
	handleEvent(event: any): void;
}
type StackInstructionTypeCategory = ['push', ...any[]] | ['drop'];
type ObjectInstructionTypeCategory = ['get'];
type CallInstructionTypeCategory = ['call', number] | ['return'];
type TuringInstructionTypeCategory = ['halt'];
type SpecialInstructionTypeCategory = ['push_args'] | ['this'] | ['push_window'];
type DebugInstructionTypeCategory = ['breakpoint'];
type InstructionType = StackInstructionTypeCategory
	| ObjectInstructionTypeCategory
	| CallInstructionTypeCategory
	| TuringInstructionTypeCategory
	| SpecialInstructionTypeCategory
	| DebugInstructionTypeCategory;

declare class SimpleStackVM<ReturnType, StackItemType> {
	instructions: InstructionType[];
	instruction_pointer: number;
	stack: StackItemType[];
	return_value: ReturnType;
	running: boolean;
	constructor(instructions: InstructionType[]);
	reset(): void;
	push(value: StackItemType): void;
	pop(): StackItemType;
	run(...run_arguments: any[]): ReturnType;
}
declare class EventHandlerVMDispatch extends SimpleStackVM<any, any> {
	target_obj: any;
	constructor(instructions: InstructionType[], target_obj: any);
	handleEvent(event: any): void;
}
declare class CompressionStatsCalculator {
	hit_counts: number[];
	cache: string[];
	constructor();
	map_values(): this['hit_counts'];
	map_keys(): this['cache']
	add_hit(index: number): void;
	add_item(key: string): void;
	reset(): void;
	calc_compression_stats(arr: any[], win_size: number): any[];
	calc_for_stats_window_size(stats_arr: any[][], arr: any[], win_size: number): void;
	calc_for_stats_index(stats_arr: any[][], arr: any[], index: number): void;
}
declare class BaseCompression {
	did_compress(src: string[], dst: string[]): boolean;
	did_decompress(src: string[], dst: string[]): boolean;
	compress_result(src: string[], dst: string[]): [boolean, string[]];
	decompress_result(src: string[], dst: string[]): [boolean, string[]];
}
declare class CompressedArray extends Array<string>{}
declare class UncompressedArray extends Array<string>{}
declare class MulCompression extends BaseCompression {
	stats_calculator: CompressionStatsCalculator;
	compression_stats: any[];
	constructor();
	try_compress(arr: UncompressedArray): [boolean, CompressedArray | null];
	try_decompress(arr: CompressedArray): [boolean, UncompressedArray];
	compress_array(arr: UncompressedArray): CompressedArray;
}
declare function calc_ratio(arr: number[]): number | 0;
declare class AverageRatio {
	arr: number[];
	history: number[];
	count: number;
	len: number;
	history_len: number;
	weight: number;
	human_duration: string;
	constructor(max_len: number, max_history_len: number, weight: number, human_duration: string, initial_arr: number[]);
	add(value: number, from_prev: boolean, debug: boolean): boolean;
	can_average(): boolean;
	get_average(): number;
}
interface RecordType<T> {
	children: T[];
	append_child(record: T): void;
	remove_child(record: T): void;
}
declare class BaseRecord<T> {
	root: AsyncNodeRoot<T>;
	constructor(root: AsyncNodeRoot<T>);
	start(): void;
	run(): void;
}
declare class AsyncDelayNode<T> extends BaseRecord<AsyncNodeRoot<T>> {
	cint: number;
	target_obj: any;
	target_get_member_name: string;
	label: string;
	timeout: number;
	constructor(root: AsyncNodeRoot<T>, target_obj: any, get_member_name: string, label: string);
	start(): void;
	run(self?: this): void;
}
declare class AsyncNodeRoot<T> implements RecordType<T> {
	children: T[];
	constructor();
	append_child(record: T): void;
	remove_child(record: T): void;
}
declare class AverageRatioRoot {
	map: Map<string, AverageRatio>;
	ordered_keys: string[];
	constructor();
	set_ordered_keys(ordered_keys: string[]): void;
	can_average(key: string): boolean;
	get_average(key: string): number;
	push_ratio(ratio_tuple: [key: string, ratio: AverageRatio]): void;
	push(value: number): void;
}
declare class AutoBuyState {
	debug: boolean;
	arr: number[];
	ratio: number;
	compressor_stats: any[];
	arr_max_len: number;
	val: number;
	ratio_mode: 0 | 1 | 2 | 3;
	locked_cycles: number;
	root_node: AsyncNodeRoot<AsyncDelayNode<{}>>;
	is_init_complete: boolean;
	avg: AverageRatioRoot;
	prev_atomepersecond: number;
	ratio_mult: number;
	div: number;
	constructor();
	init(): void;
	calc_ratio(): number | 0;
	append_value(value: number): void;
	update_ratio_mode(): void;
	get_mul_modifier(): number;
	get_near_val(): [number, number];
	cycle_log(): void;
	update(): void;
	reset(): void;
}
declare function auto_buy_unload_handler(): void;
type TimeoutCintItem = [0, number, string];
type CIntItem = TimeoutCintItem;
declare var timeplayed: number;
declare function lightreset(): void;
declare function lightreset_inject(): void;
declare function async_compress(self: AutoBuy): void;
declare class AutoBuy {
	delay: number;
	extra: number;
	iter_count: number
	epoch_len: number
	background_audio: HTMLAudioElement;
	state: AutoBuyState;
	cint_arr: CIntItem[];
	skip_save: boolean;
	state_history_arr: string[] | CompressedArray;
	compressor: MulCompression;
	constructor();
	pre_init(): void;
	async_pre_init(): Promise<void>;
	save_state_history_arr(): void;
	load_state_history_arr(arr: string[]): void;
	delay_arr: number[];
	get_delay_arr_data(forced_action: string): string;
	save_delay_arr(): void;
	display_style_sheet: CSSStyleSheet;
	history_element: HTMLDivElement;
	delay_element: HTMLDivElement;
	hours_played_element: HTMLDivElement;
	percent_ratio_element: HTMLDivElement;
	percent_ratio_change_element: HTMLDivElement;
	state_log_element: HTMLDivElement;
	dom_pre_init(): void;
	state_history_arr_max_len: number;
	init_dom(): void;
	global_init(): void;
	cint: number;
	destroy(): void;
	parse_single_int(string: string): number;
	default_split(string: string): string[];
	parse_delay_arr(data: string): number[];
	load_delay_arr(): number[];
	update_dom(self?: this): void;
	init(): void;
	delayed_init(self?: this): void;
	state_history_clear_for_reset(): void;
	state_history_append(value: string): void;
	history_element_click_handler(event: Event): void;
	calc_delay_extra(): number;
	pre_total: number;
	main(self?: this): void;
	step_iter_start(): void;
	get_delay_change(pow_base: number, pow_num: number, div: number): number;
	update_delay(change: number, decrease: boolean): void;
	do_delay_dec(pow_terms: [number], div: number): void;
	do_delay_inc(pow_terms: [number, number], div: number): void;
	large_decrease(): void;
	normal_decrease(): void;
	rare_begin_or_faster_delay(self?: this): void;
	faster_delay(self?: this): void;
	fast_unit_delay(self?: this): void;
	fast_unit(self?: this): void;
	slow_final(self?: this): void;
	bonus(self?: this): void;
	special_delay(self?: this): void;
	is_special_done(special_buyable: {done: boolean, cost: number}): boolean;
	do_special(self?: this): boolean;
	bonus_delay(self?: this): void;
	special(self?: this): void;
	initial_special(self?: this): void;
	rare_begin(self?: this): void;
	reset_delay_trigger(self?: this): void;
	reset_delay_start(self?: this): void;
	reset_delay_run(self?: this): void;
	reset_delay_init(self?: this): void;
}
declare const auto_buy_obj: AutoBuy;
declare class AsyncTrigger<S, W, N> {
	m_set_flag: boolean;
	trigger_handler: any;
	promise_set: Promise<S>;
	m_set: (value: S) => void;
	m_set_error: (reason?: any) => void;
	constructor();
	set(cnt: S): void;
	set_error(opt_error: any): void;
	wait(): Promise<W>;
	m_can_notify: boolean;
	m_notify: (value: N) => void;
	notify(cnt: N): void;
	m_notify_error: (reason?: any) => void;
	notify_error(error: any): void;
	notify_promise: Promise<N>;
	notified(): Promise<N>;
}
type PromiseResult<T extends Promise<any>> = T extends Promise<infer U> ? U : never;
declare class Sub<N, V>{
	run(v: N, n: V): number;
}
declare class WhileDoLoop extends TypeRun<any> {}
declare class IfStatement extends TypeRun<any> {}
declare class TypeRun<T> {
	run_arg1(using_val: T): void;
}
//spell: disable-next-line
declare class TypeRunOper<A, B> extends TypeRun<A | B>{
	run_arg2(right: A, left: B): void;
}
//spell: disable-next-line
declare class TypeRunLtEq<A, B> extends TypeRunOper<A, B>{}
declare class AsyncSemaphore {
	count: number;
	notify_waiters_vec: AsyncTrigger<any, void, number>[];
	constructor();
	inc(cnt: number): Promise<void>;
	dec(cnt: number): Promise<void>;
}
declare function do_auto_unit_promote(): void;
declare function map_to_tuple(this: string[], e: any, i: any): [typeof e, typeof this[typeof i]];
declare function to_tuple_arr(keys: any[], values: any): ReturnValue<typeof keys.map>;
declare function promise_exec(a: (value: void) => void): void;
declare function do_async_wait(delay: number): Promise<void>;
declare function array_sample_end(arr: string[], rem_target_len: number): string[];
declare function char_len_of<T extends string>(arr: T[]): number;
declare var allspec: any[];
//spell:words specialsbought atomsinvest checkspec specaps noti plurials updateprogress achiSpec
declare function specialclick_inject(that: typeof allspec[number]): void;
declare function on_page_is_loaded(): void;
type ProxySetHandler = [target: object, propertyKey: PropertyKey, value: any, receiver?: any];
type ProxyGetHandler = [target: object, propertyKey: PropertyKey, receiver?: any];
type ProxyApplyHandler = [target: Function, thisArgument: any, argumentsList: ArrayLike<any>];
type P1T = [null, 3 | 12 | 8 | 4];
type P2T = [null, 3 | 12 | 8 | 4];
type P3T = [null, 3 | 12 | 8 | 4];
type P4T = [...P1T | P2T | P3T, ...P1T | P2T | P3T];
type ProxyFromType = (P1T[1] & P4T[1])[];
type V1 = [...ProxyFromType];
declare class ProxyHandlers {
	count_arr: number[];
	constructor(root: any);
	so_init(): void;
	weak_root: WeakRef<KeepSome>;
	generic(
		type: string,
		call_args: ProxySetHandler
			| ProxyGetHandler
			| ProxyApplyHandler,
		from: any[]
	): void;
	set_(
		obj: any,
		call_args: ProxySetHandler,
		from: (string | number | null)[]
	): boolean;
	get_(
		obj: any,
		call_args: ProxyGetHandler,
		from: (string | number | null)[]
	): any;
	apply_(
		obj: any,
		call_args: ProxyApplyHandler,
		from: (string | number | null)[]
	): any;
	defineProperty_(
		obj: any,
		call_args: [
			target: object,
			propertyKey: PropertyKey,
			attributes: PropertyDescriptor
		],
		from: (string | number | null)[]
	): boolean;
	getOwnPropertyDescriptor_(
		obj: any,
		call_args: [
			target: object,
			propertyKey: PropertyKey
		],
		from: (string | number | null)[]
	): PropertyDecorator;
}
declare class KeepSome extends Array {
	constructor();
	push(value: any): number;
	push_at<T extends 0>(index: T, value: any): number;
	push_at<T extends number>(index: T, value: any): number | void;
	push_va(...a: any[]): void;
}
declare function define_property_value(
	obj: any, name: any, value: any,
	...props: [writable?: boolean, enumerable?: boolean, configurable?: boolean]
): void;
declare function define_property_get_set(
	obj: any, name: any, get_set_obj: any,
	...props: [enumerable: boolean, configurable: boolean]
): void;
declare function define_property_get_void(
	obj: any, name: any,
	...props: [enumerable?: boolean, configurable?: boolean]
): void;
declare function define_property_set_callback(
	obj: any, name: any, set: any,
	...props: [enumerable?: boolean, configurable?: boolean]
): void;
declare function got_jquery(
	jquery_func: (...jquery_args: unknown[]) => unknown
): void;
declare function proxy_jquery(): void;
declare function pace_finish_proxy_apply(
	func: (value: WorkerState) => void,
	this_v: any, args: any[]
): void;
declare function on_game_data_set(): void;
declare function on_timers_moved(): void;
declare function dom_add_elm_filter(elm: HTMLScriptElement): boolean;
declare function main(): void;
export type SpecType={
	name: 'Breit-Wheeler process'
	desc: 'Convert pure light to matter.'
	done: false | true
	cost: 100000
}

declare global {
	export interface Window {
		atomepersecond: number;
		totalAtome: number;
		prestige: number;
		g_auto_buy: AutoBuy;
		__testing__: false;
		bonusAll(): void;
		allspec: SpecType[];
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
		cint_arr: string[];
		adsbygoogle: {
			op: any,
			push(v: number): void;
		};
		plurials(v: string): string;
		arrayNames: string[];
		updateprogress(v: any): void;
		$: (val: any) => any;
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
		document_write_list: DocumentWriteList;
		da: any[];
		lightreset(): void;
		specialclick(that: any): void;
		g_worker_state?: WorkerState | undefined;
	}
	export var Window: {
		prototype: Window;
		new(): Window;
	};
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
}

export var window: Window & typeof globalThis;
