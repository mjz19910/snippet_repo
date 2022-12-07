export {};

declare global {
	interface Window {
		debug?:debug;
		undebug?:undebug;
		dz?: any;
		__state: {lex_chunks: any[]; m_l_str: any; reset_count: boolean;};
	}

	interface undebug {
		(fn: ()=>void): void;
	}

	interface debug {
		(fn:()=>void, code:string): void;
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
		o: any;
	}

	var debug: debug|undefined;
	var __for_code: {(func: any,flag:boolean): any; targets: any[];};
	var __lst: any[];
	var __r_ret: any;
	var __res: any[];
	var __instance: {constructor: any;};
	var __nx_names: never[];
}
