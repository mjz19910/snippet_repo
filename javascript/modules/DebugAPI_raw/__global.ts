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

interface DebugAPI_the {
	get_k(v: string): any;
	clearCurrentBreakpoint(): boolean;
}

type DebugAPIType={
	the(): DebugAPI_the;
};

// DebugAPI
interface GlobalApiObject {
	DoCalc: {};
	reversePrototypeChain: {};
	ReversePrototypeChain: {};
	tmp: {};
	any_api_logger: {};
	parse_html_to_binary_arr: (html: string) => unknown[];
	run_modules_plugin: VoidCallbackWith<() => void>;
	run_wasm_plugin: VoidCallbackWith<() => void>;
	compress_main: VoidCallbackWith<(stats: {}) => void>;
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
	DebugAPI: DebugAPIType;
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
