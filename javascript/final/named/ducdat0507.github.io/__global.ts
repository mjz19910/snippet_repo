export {};

declare global {
	interface Window {
		CustomInputMatcher: typeof CustomInputMatcher;
		debugApi: {};
		__ret: {};
		debug?:debug;
		undebug?:undebug;
		find_closed_up_x: any;
		find_closed_up_y: any;
		find_closed_dn_x: any;
		find_closed_dn_y: any;
		dz?: any;
	}
	var debugApi: DebugAPI;
	var CustomInputMatcher: typeof X.CustomInputMatcher;

	class DebugAPI {
		asyncExecuteFunction(top: Window|null,function_: any): void;
	}

	type SymbolIndexable={
		[x: symbol]: any;
	}

	interface undebug {
		(fn: ()=>void): void;
	}
	var undebug: undebug;

	interface debug {
		(fn:()=>void, code:string): void;
		u:any;
		fo:any;
		st: any;
		sarr: any;
		ne: any;
		__ident_start_chars: any;
		__ident_chars: any;
		__all_vars: any;
		__getter_names: any;
		__get_list: any;
		__name_list: any;
		__replace_func: any;
		__orig_func: any;
		cb: any;
		__trg_eval: any;
		gr: any;
		rx: any;
		o: any;
		f: any;
	}

	var debug: debug|undefined;
	var __fo: any;
	var __for_code: any;
	var __lst: any;
	var __ret: never;
	var __w: any;
	var __m: any;
	var __r_ret: any;
	var __res: any;
	var __instance: any;
	var __nx_names: any;
	var layers: {aspTime: {buyables: {cost: (arg0: any) => any;}[];};};
	var player: {aspTime: {buyables: any[]; points: {lt: (arg0: any) => any;};};};
	var Decimal: new (arg0: any) => any;
	function buyBuyable(a: string,b: number):void;
}
namespace X {
	export class CustomInputMatcher {
		test_string: string|RegExp;
		test_needle: string|RegExp;
		ts_get: unknown;
		constructor(test_string: string|RegExp,string_getter: unknown) {
			this.test_string=test_string;
			this.test_needle="";
			this.ts_get=string_getter;
		}
	}
}
