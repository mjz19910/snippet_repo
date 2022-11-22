export {};

declare global {
	interface Window {
		CustomInputMatcher: typeof CustomInputMatcher;
		debugApi: {};
		__ret: {};
		debug?:debug;
		undebug?:undebug;
		find_closed_up_x;
		find_closed_up_y;
		find_closed_dn_x;
		find_closed_dn_y;
		dz?;
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
		st;
		sarr;
		ne;
		__ident_start_chars;
		__ident_chars;
		__all_vars;
		__getter_names;
		__get_list;
		__name_list;
		__replace_func;
		__orig_func;
		cb;
		__trg_eval;
		gr;
		rx;
		o;
		f;
	}

	var debug: debug|undefined;
	var __fo;
	var __for_code;
	var __lst;
	var __ret;
	var __w;
	var __m;
	var __r_ret;
	var __res;
	var __instance;
	var __nx_names;
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
