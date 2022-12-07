export {type Holder} from "../Holder.js";

declare global {
	class JSLexState {
		m_l_str: string|undefined;
		lex_chunks: any[];
		reset_count: boolean;
		m_at_eof: boolean;
		obj: {break_parse: boolean; eof: boolean; reset_count: boolean; nx_len: number; lex_cur: any;}|null;
		constructor(str: string,obj: {break_parse: boolean; eof: boolean; reset_count: boolean; nx_len: number; lex_cur: any;});
	}
}

declare global {
	class JSLexState_x {
		constructor(str: string,obj: {break_parse: boolean; eof: boolean; reset_count: boolean; nx_len: number; lex_cur: any;});
		obj: {break_parse: boolean; eof: boolean; reset_count: boolean; nx_len: number; lex_cur: any;}|null;
		m_l_str: string|undefined;
		lex_chunks: any[];
		reset_count: boolean;
		m_at_eof: boolean;
	}
}

declare global {
	interface Window {
		debug?: debug;
		undebug?: undebug;
		find_closed_up_y: any;
		find_closed_dn_x: any;
		find_closed_dn_y: any;
		dz?: any;
	}

	class DebugAPI {
		asyncExecuteFunction(top: Window|null,function_: any): void;
	}

	interface undebug {
		(fn: () => void): void;
	}
	var undebug: undebug|undefined;

	interface debug {
		(fn: () => void,code: string): void;
		fo: any;
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
		o: any;
	}

	var debug: debug|undefined;
	var __for_code: {(func: any,flag: boolean): any; targets: any[];};
	var __lst: any[];
	var __r_ret: any;
	var __res: any[];
	var __instance: {constructor: any;};
	var __nx_names: never[];
}
