export {};

declare global {
	interface Window {
		find_closed_up_x: any;
		find_closed_up_y: any;
		find_closed_dn_x: any;
		find_closed_dn_y: any;
	}

	interface undebug {
		(fn: () => void): void;
	}

	var undebug: undebug;

	class has_expando {
		["jQuery_expando_1"]?: JQueryExpandoData;
	}

	type ExpandoKey=keyof has_expando;

	interface Element {
		["jQuery_expando_1"]?: JQueryExpandoData;
	}

	var Element: typeof Element;

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
		(fn: (...x: any[]) => void,code: string): void;
		u: (fn: (...x: any[]) => void) => void;
		st: Set<any>;
		sarr: any[];
		ne: any[];
		__trg_eval: (arg0: string) => void;
		rx: RxType;
		o: any;
		f: (...a: any[]) => any;
		cb: (__eval: (arg0: string) => void) => void;
	}

	var debug: debug|undefined;

	var __fo: any[][];
	var __lst: any[];
	var __ret: {};
	var __w: RxType;
	var __r_ret: any;
	var __res: any[];
	var __instance: {constructor: any;};
}

interface JQueryExpandoData {
	events: JQueryEvents;
}

interface JQueryEvents {
	click: any;
	mouseup: JQueryEventHandler[];
}

interface JQueryEventHandler {
	handler: (...a: any[]) => any;
}
