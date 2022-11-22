export {};

declare global {
	class DebugAPI {
		asyncExecuteFunction(top: Window|null,function_: any): void;
	}
	var debugApi: DebugAPI;
	interface Window {
		debugApi: {};
		CustomInputMatcher:{};
		find_closed_up_x: any;
		find_closed_up_y: any;
		find_closed_dn_x: any;
		find_closed_dn_y: any;
	}

	interface undebug {
		(fn: ()=>void): void;
	}
	var undebug: undebug;

	type ExpandoKey="jQuery_expando";

	interface RxType {
		obj_field?: any;
		I_listener?: any;
		jQuery?: {
			G: {
				expando: ExpandoKey;
			};
		};
		game_scope?: any;
	}

	interface GrType {
		m: () => any;
}

	interface debug {
		gr: GrType;
		(fn:(...x:any[])=>void, code:string): void;
		u: (fn: (...x:any[])=>void) => void;
		fo: any[][];
		st: Set<any>;
		sarr: any[];
		ne: any[];
		__ident_start_chars: any;
		__ident_chars: any;
		__all_vars: any;
		__getter_names: any;
		__get_list: any;
		__name_list: any;
		__replace_func: any;
		__orig_func: any;
		__trg_eval: (arg0: string) => void;
		rx: RxType;
		o: any;
		f: (...a:any[])=>any;
		cb: (__eval: (arg0: string) => void) => void;
	}

	interface Element {
		jQuery_expando:JQueryExpandoData;
	}

	var debug: debug|undefined;

	var CustomInputMatcher: typeof Impl.CustomInputMatcher;

	var __fo: any[][];
	var __for_code: any;
	var __lst: any[];
	var __ret;
	var __w;
	var __m;
	var __r_ret;
	var __res;
	var __instance;
}

interface JQueryExpandoData {
	events: JQueryEvents;
}

interface JQueryEvents {
	mouseup:JQueryEventHandler[];
}

interface JQueryEventHandler {
	handler: (...a:any[])=>any;
}

namespace Impl {
	export class CustomInputMatcher {
		test_string: any;
		test_needle: any;
		constructor(t_needle: any, t_string_getter: any) {
			t_needle;
			t_string_getter;
		}
	}
}