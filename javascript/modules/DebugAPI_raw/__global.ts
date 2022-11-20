//@@iterator for NodeListOf
declare global {
	interface NodeListOf<TNode extends Node> extends NodeList {
		[Symbol.iterator](): IterableIterator<TNode>;
	}
}
declare global {
	interface Window {
		g_api: GlobalApiObject;
	}
}

class StatsCalcEmpty {};
class VoidCallback<U extends any[],C> {
	m_callback: ((...args: U) => C);
	constructor(callback: (...args: U) => C) {
		this.m_callback=callback;
	}
	/** @param {U} args */
	execute(...args: U) {
		return this.m_callback(...args);
	}
}

interface ReversePrototypeChainInterface {
	add_target(target: {}): void;
	generate(): void;
}

class ReversePrototypeChain implements ReversePrototypeChainInterface {
	constructor(base: {},targets: {}[]) {};
	add_target(target: {}) {};
	generate() {};
}

type VoidCallbackWith<T extends (...args: any[]) => any>=VoidCallback<Parameters<T>,ReturnType<T>>;

// SafeFunctionPrototype
declare global {
	type SafeFunctionPrototype={
		apply: (this: Function,thisArg: any,argArray?: any) => any;
		bind: (this: Function,thisArg: any,...argArray: any[]) => any;
		call: (this: Function,thisArg: any,...argArray: any[]) => any;
	};
}

class Repeat<T> {
	value;
	times;
	constructor(value: T,times: number) {
		this.value=value;
		this.times=times;
	}
	static from_TU_entry(a: ["string",string]|["number",number],b: number): ["string",string|Repeat<string>]|["number",number|Repeat<number>] {
		throw 1;
	}
}

declare global {
	type AnyOrRepeat<T>=T|Repeat<T>;
}

declare global {
	type AnyOrRepeat2<T,U>=["T",AnyOrRepeat<T>]|["U",AnyOrRepeat<U>];
}

declare global {
	type TypeAOrTypeB<TypeA,TypeB>=["T",TypeA]|["U",TypeB];
}


declare global {
	class IDValue {
		set_arr_T<T>(arr: T[]): void;
		id: number;
		next: IDValue|null;
		arr_dual: (["string",string]|["number",number])[];
		arr_dual_compressed: (["string",AnyOrRepeat<string>]|["number",AnyOrRepeat<number>])[];
		arr_rep_str: never[];//AnyOrRepeat<string>[];
		arr_rep_num: never[];//AnyOrRepeat<number>[];
		arr_str: string[];
		arr_num: number[];
		value: [number,'=',number]|null;
		arr_rep: number[];
		log_val: [number,'=',string,number]|null;
		stats: [string,number][];
		stats_win: number;
		constructor(id: number,next: IDValue|null);
	}
}

declare global {
	type DualR=[true,(["string",AnyOrRepeat<string>]|["number",AnyOrRepeat<number>])[]]|[false,(["string",string]|["number",number])[]];
}

class CompressDual {
	/**@type {number} */
	i: number;
	/**@type {(["string", string] | ["number", number])[]} */
	arr: (["string",string]|["number",number])[]=[];
	/**@type {(["string",AnyOrRepeat<string>]|["number",AnyOrRepeat<number>])[]} */
	ret: (["string",AnyOrRepeat<string>]|["number",AnyOrRepeat<number>])[]=[];
	/**@returns {DualR} */
	try_compress_dual(): DualR {
		let state=this;
		for(;state.i<state.arr.length;state.i++) {
			let item=state.arr[state.i];
			let use_item=this.compress_rle_TU_to_TX(item);
			if(use_item) continue;
			state.ret.push(item);
		}
		return BaseCompressionAlt.compress_result_state_dual(this);
	}
	/**@arg {(["string", string] | ["number", number])} item */
	compress_rle_TU_to_TX(item: (["string",string]|["number",number])) {
		if(this.i+1>=this.arr.length&&item!==this.arr[this.i+1]) return false;
		let off=1;
		while(item===this.arr[this.i+off]) off++;
		if(off==1) return false;
		this.ret.push(Repeat.from_TU_entry(item,off));
		this.i+=off-1;
		return true;
	}
	/**@arg {(["string", string] | ["number", number])[]} arr */
	constructor(arr: (["string",string]|["number",number])[]) {
		this.i=0;
		this.arr=arr;
		this.ret=[];
	}
}

class BaseCompressionAlt {
	/** @arg {CompressDual} arg0 @returns {DualR} */
	static compress_result_state_dual(arg0: CompressDual): DualR {
		return this.compress_result_dual(arg0.arr,arg0.ret);
	}
	/** @arg {(["string", string] | ["number", number])[]} src @arg {(["string", AnyOrRepeat<string>] | ["number", AnyOrRepeat<number>])[]} dst @returns {DualR} */
	static compress_result_dual(src: (["string",string]|["number",number])[],dst: (["string",AnyOrRepeat<string>]|["number",AnyOrRepeat<number>])[]): DualR {
		if(this.did_compress(src,dst)) return [true,dst];
		return [false,src];
	}
	/** @template T,U @arg {T[]} src @arg {U[]} dst */
	static did_compress<T,U>(src: T[],dst: U[]) {
		return dst.length<src.length;
	}
	/** @template T @arg {T[]} src @arg {T[]} dst */
	did_decompress<T>(src: T[],dst: T[]) {
		return dst.length>src.length;
	}
	/**@template T,U @arg {CompressStateBase<T, U>} state*/
	static compress_result_state<T,U>(state: CompressStateBase<T,U>) {
		return this.compress_result(state.arr,state.ret);
	}
	/** @template T,U @arg {T[]} src @arg {U[]} dst @returns {[true, U[]] | [false, T[]]} */
	static compress_result<T,U>(src: T[],dst: U[]): [true,U[]]|[false,T[]] {
		if(this.did_compress(src,dst))
			return [true,dst];
		return [false,src];
	}
	/** @arg {string[]} src @arg {string[]} dst @returns {[res: boolean,dst: string[]]} */
	decompress_result(src: string[],dst: string[]): [res: boolean,dst: string[]] {
		// maybe this is not a decompression, just a modification to make
		// later decompression work
		if(this.did_decompress(src,dst))
			return [true,dst];
		return [false,dst];
	}
}

export class CompressStateBase<T,U> {
	/** @type {number} */
	i: number;
	/** @type {T[]} */
	arr: T[];
	/** @type {U[]} */
	ret: U[];
	/** @arg {number} i @arg {T[]} arr @arg {U[]} ret */
	constructor(i: number,arr: T[],ret: U[]) {
		this.i=i;
		this.arr=arr;
		this.ret=ret;
	}
}

export class CompressState<T,U> extends CompressStateBase<T,U> {
	item: T|null=null;
	constructor(arr: T[]) {
		super(0,arr,[]);
	}
}

class MulCompressionAlt extends BaseCompressionAlt {
	/**
	 * @template T
	 * @arg {T[]} arr
	 * @returns {[true, AnyOrRepeat<T>[]]|[false,T[]]} */
	try_compress_T<T>(arr: T[]): [true,AnyOrRepeat<T>[]]|[false,T[]] {
		/**@type {CompressState<T,T|Repeat<T>>} */
		let state: CompressState<T,T|Repeat<T>>=new CompressState(arr);
		for(;state.i<state.arr.length;state.i++) {
			let item=state.arr[state.i];
			let use_item=this.compress_rle_T_X(state,item);
			if(use_item) continue;
			state.ret.push(item);
		}
		return MulCompressionAlt.compress_result_state(state);
	}
	/**
	 * @template {RecordKey<symbol>} U
	 * @template {InstanceType<U>} T
	 * @arg {CompressState<T, AnyOrRepeat<T>>} state
	 * @arg {T} item
	 * */
	compress_rle_T_X<U,T>(state: CompressState<T,AnyOrRepeat<T>>,item: T) {
		if(state.i+1>=state.arr.length&&item!==state.arr[state.i+1]) return false;
		let off=1;
		while(item===state.arr[state.i+off]) off++;
		if(off==1) return false;
		state.ret.push(new Repeat(item,off));
		state.i+=off-1;
		return true;
	}
	compress_result_T<T,U extends new (...args: any) => any>(_: U,arr: T[],ret: AnyOrRepeat<T>[]): [true,AnyOrRepeat<T>[]]|[false,T[]] {
		if(MulCompressionAlt.did_compress(arr,ret)) return [true,ret];
		return [false,arr];
	}
	compress_rle(state: {i: number; arr: string[]; ret: string[];},item: string) {
		if(state.i+1>=state.arr.length&&item!==state.arr[state.i+1]) return false;
		let off=1;
		while(item===state.arr[state.i+off]) off++;
		if(off==1) return false;
		state.ret.push(`${item}${off}`);
		state.i+=off-1;
		return true;
	}
	try_compress(arr: string[]) {
		let state: CompressState<string,string>=new CompressState(arr);
		for(;state.i<state.arr.length;state.i++) {
			let item=state.arr[state.i];
			let use_item=this.compress_rle(state,item);
			if(use_item) continue;
			state.ret.push(item);
		}
		return MulCompressionAlt.compress_result_state(state);
	}
	try_decompress(arr: string[]): [res: boolean,dst: string[]] {
		let ret=[];
		for(let i=0;i<arr.length;i++) {
			let item=arr[i];
			if(i+1<arr.length) {
				let [item_type,num_data]=[item[0],item.slice(1)];
				let parsed=parseInt(num_data);
				if(!Number.isNaN(parsed)) {
					for(let j=0;j<parsed;j++) ret.push(item_type);
					continue;
				}
			}
			ret.push(arr[i]);
		}
		return this.decompress_result(arr,ret);
	}
	compress_array(_arr: string[]): string[] {
		throw 1;
	}
}


class CompressionStatsCalculatorAlt {
	hit_counts: number[]=[];
	cache: string[]=[];
	compressor: MulCompressionAlt=new MulCompressionAlt;
	add_item: []=[];
	add_hit: []=[];
	reset: []=[];
	map_values: []=[];
	map_keys: []=[];
	calc_compression_stats(arr: string[],win_size: number): [string,number][] {
		throw 1;
	}
	replace_range: []=[];
	test: []=[];
	calc_for_stats_index(stats_arr: [string,number][][],arr: string[],index: number) {
		stats_arr[index]=this.calc_compression_stats(arr,index+1);
	}
}
declare global {
	type dbg_T1={
		type: 'argument-error';
		data: null;
	};

	type dbg_T2={
		type: "argument-error";
		data: null;
	};

	type dbg_T3={
		type: "data";
		data: {
			result: [string,any];
			return: any;
		};
	};

	type dbg_T4={
		type: "unexpected";
		data: {
			result: {
				type: 'hidden-var';
				var: string;
			}|{
				type: 'no-var';
				data: null;
			};
			return: any;
		};
	};

	type dbg_T5={
		type: 'invalid-state-error';
		data: null;
	};

	type dbg_T6={
		type: 'data-arr';
		data: {
			result: any[];
			return: any;
		};
	};

	type dbg_t1={
		type: "no-response";
		data: {
			result: null,
		};
	};

	type dbg_t2={
		type: 'no-response-null-result';
		data: {
			result: null;
			return: any;
		};
	};

	type dbg_result=dbg_T1|dbg_T2|dbg_T3|dbg_T4|dbg_T5|dbg_T6|dbg_t1|dbg_t2;
}

declare global {
	interface dbg_get_ty {
		get: (__v: string) => {type: string; data: null;}|{type: string; data: any[];};
	}
}
declare global {
	type EventListenerInternal={
		listener: Function,
		once: boolean,
		passive: boolean,
		type: "string",
		useCapture: boolean,
	};
}

class DebugAPIAlt {
	any_api_logger=(function() {
		function get_val(): {} {
			throw 1;
		}
		return get_val();
	})();
	next_remote_id=0;
	data_store=new Map;
	event_handler=(function() {
		function get_val(): {} {
			throw 1;
		}
		return get_val();
	})();
	static udp_like_remote_origin_connection=(function() {
		function get_val(): {} {
			throw 1;
		}
		return get_val();
	})();
	static token_tree_parser=(function() {
		function get_val(): {} {
			throw 1;
		}
		return get_val();
	})();
	static m_the: DebugAPIAlt|null=null;
	static the(): DebugAPIAlt {
		if(!this.m_the) {
			this.m_the=new this;
		}
		return this.m_the;
	}
	/** @arg {string} key @returns {boolean} */
	hasData(key: string): boolean {
		return this.data_store.has(key);
	}
	/** @arg {string} key @returns {any} */
	getData(key: string): any {
		return this.data_store.get(key);
	}
	/** @arg {"__k"} key @returns {dbg_get_ty} */
	get_k(key: "__k"): dbg_get_ty {
		return this.data_store.get(key);
	}
	/** @arg {"getEventListeners"} key @returns {(x:{})=>{[x: string]: EventListenerInternal[];}} */
	get_getEventListeners(key: "getEventListeners"): (x: {}) => {[x: string]: EventListenerInternal[];} {
		return this.data_store.get(key);
	}
	/** @arg {string} key @arg {any} value @returns {this} */
	setData(key: string,value: any): this {
		this.data_store.set(key,value);
		return this;
	}
	/** @arg {string} key @returns {boolean} */
	deleteData(key: string): boolean {
		return this.data_store.delete(key);
	}
	/**
	 * @param {any} element @returns {{[x: string]: EventListenerInternal[];}}
	 */
	getEventListeners(element: any): {[x: string]: EventListenerInternal[];} {
		if(!this.hasData('getEventListeners'))
			throw 1;
		return this.getData('getEventListeners')(element);
	}
	/**
	 * @param {any} debug
	 * @param {any} undebug
	 * @param {(this: any, ...args: readonly any[]) => any} func
	 * @param {any} name
	 */
	get_event_listener_var_vec_1(debug: any,undebug: any,func: (this: any,...args: readonly any[]) => any,name: any): {} {
		throw 1;
	}
	/**
	 * @param {any} debug
	 * @param {any} undebug
	 * @param {null} getEventListeners @returns {this}
	 */
	attach(debug: any,undebug: any,getEventListeners: null): this {
		//Attach to the chrome DebugApi functions the user specified.
		let obj_debug=this.getData('d');
		let obj_undebug=this.getData('u');
		let get_ev_lis=this.getData('getEventListeners');
		if(obj_debug!==debug||obj_undebug!==undebug||get_ev_lis!==getEventListeners) {
			this.setData('d',debug);
			this.setData('u',undebug);
			this.setData('getEventListeners',getEventListeners);
		}
		return this;
	}
	/**
	 * @param {new (...arg0: any[]) => any} class_value
	 * @param {any[]} arg_vec @returns {boolean}
	 */
	activateClass(class_value: new (...arg0: any[]) => any,arg_vec: any[]): boolean {
		return new class_value(...arg_vec);
	}
	/**
	 * @param {any} function_value
	 * @param {any} target_obj
	 * @param {any} arg_vec @returns {boolean}
	 */
	activateApply(function_value: any,target_obj: any,arg_vec: any): boolean {
		return Reflect.apply(function_value,target_obj,arg_vec);
	}
	/** @returns {void} */
	debuggerBreakpointCode(): void {
		window.g_api.DebugAPI.the().get_k("__k").get=(/** @type {string} */ __v: string) => {
			if(__v==='__v') {
				return {
					type: 'eval-hidden-var',
					data: null,
				};
			}
			try {
				return {
					type: 'var',
					data: [__v,eval(__v)]
				};
			} catch {
				return {
					type: 'no-var',
					data: null
				};
			}
		};
		if(!window.g_api.DebugAPI.the().clearCurrentBreakpoint()) {
			console.log("failed to clear breakpoint");
		}
		0;
	}
	current_function_value?: (this: any,...args: readonly any[]) => any;
	/** @returns {boolean} */
	clearCurrentBreakpoint(): boolean {
		let undebug;
		if(undebug=this.getData("u")) {
			undebug(this.current_function_value);
			return true;
		}
		return false;
	}
	/**
	 * @argument {Function} function_value
	 * @returns {string}
	*/
	stringifyFunction(function_value: Function): string {
		let function_code=function_value.toString();
		if(function_code.includes("{}"[0])) {
			function_code=function_code.slice(function_code.indexOf("{}"[0]));
		} else {
			console.log(function_code);
		}
		return function_code;
	}
	/**
	 * @param {any} function_value
	 * @param {any} activate
	 * @param {string} var_match
	 * @arg {any} target_obj
	 * @param {any[]} target_activate_args
	 */
	debuggerGetVarArray_a(function_value: any,activate: any,var_match: string,target_obj: any,target_activate_args: any[]): dbg_result {
		function_value; activate; var_match; target_obj; target_activate_args;
		throw 1;
	}
	/**
	 * @param {any} class_value
	 * @param {any} target_arg_vec
	 * @param {any} var_match
	 */
	debuggerGetVarArray_c(class_value: any,target_arg_vec: any,var_match: any): dbg_result {
		if(target_arg_vec instanceof Array) {
			return this.debuggerGetVarArray_a(class_value,this.activateClass,var_match,target_arg_vec[0],target_arg_vec.slice(1));
		}
		return {
			type: 'argument-error',
			data: null
		};
	}
	/**
	 * @param {any} function_value
	 * @param {any} target_obj
	 * @param {any} target_arg_vec
	 * @param {any} var_match
	 */
	debuggerGetVarArray(function_value: any,target_obj: any,target_arg_vec: any,var_match: any): dbg_result {
		if(target_arg_vec instanceof Array) {
			return this.debuggerGetVarArray_a(function_value,this.activateApply,var_match,target_obj,target_arg_vec);
		}
		return {
			type: 'argument-error',
			data: null
		};
	}
	/**
	 * @param {(this: any, ...args: readonly any[]) => any} function_value
	 * @param {any} activate
	 * @param {any} var_name
	 * @param {any[]} activate_vec
	 */
	debuggerGetVar_a(function_value: (this: any,...args: readonly any[]) => any,activate: any,var_name: any,activate_vec: any[]): dbg_result {
		function_value; activate; var_name; activate_vec;
		throw 1;

	}
	/**
	 * @param {any} class_value
	 * @param {any} target_arg_vec
	 * @param {any} var_name
	 */
	debuggerGetVar_c(class_value: any,target_arg_vec: any,var_name: any) {
		if(typeof class_value!='function') {
			return {
				type: 'argument-error',
				value: null
			};
		}
		if(target_arg_vec instanceof Array) {
			return this.debuggerGetVar_a(class_value,this.activateClass,var_name,target_arg_vec);
		}
		return {
			type: 'argument-error',
			value: null
		};
	}
	/**
	 * @param {any} function_value
	 * @param {any} target_obj
	 * @param {any} target_arg_vec
	 * @param {any} var_name
	 */
	debuggerGetVar(function_value: any,target_obj: any,target_arg_vec: any,var_name: any) {
		function_value; target_arg_vec; target_obj; var_name;
		throw 1;
	}
}

// DebugAPI
interface GlobalApiObject {
	obj: {x: MulCompressionAlt;};
	DoCalc: {};
	reversePrototypeChain: ReversePrototypeChain;
	ReversePrototypeChain: typeof ReversePrototypeChain;
	tmp: {};
	any_api_logger: {};
	parse_html_to_binary_arr: (html: string) => unknown[];
	run_modules_plugin: VoidCallbackWith<() => void>;
	run_wasm_plugin: VoidCallbackWith<() => void>;
	compress_main: VoidCallbackWith<(stats: CompressionStatsCalculatorAlt) => void>;
	IterExtensions: {};
	getPlaybackRateMap: {};
	CreateObjURLCache: {};
	Repeat: {};
	CompressRepeated: {};
	to_tuple_arr: {};
	range_matches: {};
	function_as_string_vec: string[];
	CompressionStatsCalculator: {};
	HexRandomDataGenerator: {};
	EventListenerValue: {};
	GenericEvent: {};
	GenericDataEvent: {};
	GenericEventTarget: {};
	Dumper: {};
	RustSimpleTokenizer: {};
	RustSimpleParser: {};
	WeakValueRef: {};
	CSSCascade: {};
	OriginState: {};
	ConnectToRemoteOrigin: {};
	APIProxyManager: {};
	LoggingEventTarget: {};
	DebugAPI: typeof DebugAPIAlt;
	addEventListener: {};
}

// g_api on window object
declare global {
	interface Window {
		g_api: GlobalApiObject;
	}
}

// WeakRef
declare global {
	interface WeakRef<T extends object> {
		readonly [Symbol.toStringTag]: "WeakRef";

		/**
		 * Returns the WeakRef instance's target object, or undefined if the target object has been
		 * reclaimed.
		 */
		deref(): T|undefined;
	}

	interface WeakRefConstructor {
		readonly prototype: WeakRef<any>;

		/**
		 * Creates a WeakRef instance for the given target object.
		 * @param target The target object for the WeakRef instance.
		 */
		new <T extends object>(target: T): WeakRef<T>;
	}

	var WeakRef: WeakRefConstructor;
}
