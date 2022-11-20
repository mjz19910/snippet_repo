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
}

declare global {
	type AnyOrRepeat<T> = T|Repeat<T>;
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
		arr_dual: TypeAOrTypeB<string,number>[];
		arr_dual_x: TypeAOrTypeB<AnyOrRepeat<string>,AnyOrRepeat<number>>[];
		arr_rep_str: AnyOrRepeat<string>[];
		arr_rep_num: AnyOrRepeat<number>[];
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

interface DoCalc {
	get_result():[true,(["string", AnyOrRepeat<string>] | ["number", AnyOrRepeat<number>])[]]|[false,(string|number)[]]|null;
	m_return_value:[true,AnyOrRepeat2<string,number>[]]|[false,(string|number)[]]|null;
	run():null;
}

interface DoCalcNew {
	new (stats:CompressionStatsCalculator,obj:IDValue): DoCalc;
}

interface CompressionStatsCalculator {
	calc_for_stats_index(stats_arr: any,arr: any,index: any):void;
	add_hit(index: any):void;
	add_item(key: any):void;
	reset():void;
	map_values():void;
	map_keys():void;
	calc_compression_stats(arr: any,win_size: any): [string, number][];
	replace_range(arr: any,range: any,replacement: any):void;
	test():void;
}

interface CompressionStatsCalculatorNew {
		new (): CompressionStatsCalculator;
}

declare global {
	type DualR=[true,(["string", AnyOrRepeat<string>] | ["number", AnyOrRepeat<number>])[]]|[false,(["string",string]|["number",number])[]];
}

// DebugAPI
interface GlobalApiObject {
	DoCalc: DoCalcNew;
	reversePrototypeChain: ReversePrototypeChain;
	ReversePrototypeChain: typeof ReversePrototypeChain;
	tmp: {};
	any_api_logger: {};
	parse_html_to_binary_arr: (html: string) => unknown[];
	run_modules_plugin: VoidCallbackWith<() => void>;
	run_wasm_plugin: VoidCallbackWith<() => void>;
	compress_main: VoidCallbackWith<(stats: StatsCalcEmpty) => void>;
	IterExtensions: {};
	getPlaybackRateMap: {};
	CreateObjURLCache: {};
	Repeat: {};
	CompressRepeated: {};
	to_tuple_arr: {};
	range_matches: {};
	function_as_string_vec: string[];
	CompressionStatsCalculator: CompressionStatsCalculatorNew;
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
	DebugAPI: {};
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
