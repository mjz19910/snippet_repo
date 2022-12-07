export {};

declare global {
	interface undebug {
		(fn: () => void): void;
	}

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
		(fn: (...x: any[]) => void,code: string): void;
		st: Set<any>;
		sarr: any[];
		ne: any[];
		rx: RxType;
		o: any;
		f: (...a: any[]) => any;
	}

	var debug: debug|undefined;

	var __fo: any[][];
	var __lst: any[];
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
