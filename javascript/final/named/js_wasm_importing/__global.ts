export {};

class JSLexState {
	m_l_str: string|undefined;
	lex_chunks: any[]=[];
	reset_count: boolean=false;
	m_at_eof: boolean=false;
	obj: {break_parse: boolean; eof: boolean; reset_count: boolean; nx_len: number; lex_cur: any;}|null={
		break_parse:false,
		eof:false,
		reset_count:false,
		nx_len:0,
		lex_cur:null,
	};
	constructor(str: string, obj: {break_parse: boolean; eof: boolean; reset_count: boolean; nx_len: number; lex_cur: any;}) {
		return {
			lex_chunks: [],
			m_l_str: str,
			reset_count: false,
			m_at_eof: false,
			obj,
		};
	}
}

declare global {
	class JSLexState_x {
		constructor(str: string, obj: {break_parse: boolean; eof: boolean; reset_count: boolean; nx_len: number; lex_cur: any;});
		obj: {break_parse: boolean; eof: boolean; reset_count: boolean; nx_len: number; lex_cur: any;}|null;
		m_l_str: string|undefined;
		lex_chunks: any[];
		reset_count: boolean;
		m_at_eof: boolean;
	}
}

declare global {
	interface Window {
		CustomInputMatcher: typeof CustomInputMatcher;
		debugApi: {};
		__ret: {};
		debug?:debug;
		undebug?:undebug;
		find_closed_up_x: (arg0: number,arg1: number) => any;
		find_closed_up_y: any;
		find_closed_dn_x: any;
		find_closed_dn_y: any;
		dz?: any;
		__state: JSLexState;
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
		st: Set<any>;
		sarr: any[];
		ne: any[];
		__ident_start_chars: string[];
		__ident_chars: string[];
		__all_vars: string;
		__getter_names: string;
		__get_list: string;
		__name_list: string[];
		__replace_func: {S: () => never;};
		__orig_func: {S: any;};
		cb: any;
		__trg_eval: (arg0: string) => void;
		gr: {m: () => null;};
		rx: {jQuery?: any; I_listener?: any; game_scope?: any; obj_field?: any;};
		o: any;
		f: (...x:any[])=>void;
	}

	var debug: debug|undefined;
	var __fo: never[];
	var __for_code: {(func: any,flag:boolean): any; targets: any[];};
	var __lst: any[];
	var __ret: any;
	var __w: {I_listener: any; game_scope: any; obj_field?: any;};
	var __m: {click: (arg0: number,arg1: number) => void; opened: {field: {[x: string]: undefined;}; get: (arg0: number,arg1: number) => boolean;}; mines: {field: {[x: string]: boolean;};};}|null;
	var __r_ret: any;
	var __res: any[];
	var __instance: {constructor: any;};
	var __nx_names: never[];
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
