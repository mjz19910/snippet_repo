import {__RetType} from "./__RetType";

// __ret
declare global {
	interface Window {
		__m: {}|null;
		// __ret
		__ret: __RetType;
		// lunar-atoms-tycoon.js
		event_info: any;
		x2: any;
		events: any;
		syms: any;
		state: any;
		// kongregate_yet-another-merge-game.js
		__cint?: ReturnType<typeof window.setTimeout>|number;
		citv?: ReturnType<typeof window.setInterval>|number;
		// makiki99 prestige-frame
		HTMLIFrameExt: typeof HTMLIFrameElement;
		// youtube.com_lazyPrepareCriticalPages
		debug?: debugI|undefined;
		undebug?: undebugI|undefined;
		// reddit_continueThread.js
		react_ii: string;
		root_new: never;
		inner_dom: never;
		refs: never[];
		s_refs?: SRefBase[][];
	}
}

// lunar-atoms-tycoon.js
declare global {
	var Upgrade: {apply: (arg0: any) => {(): any; new(): any; toNumber: {(): any; new(): any;};};};
	type GameType={upgrades: {maxObjects: any;}; mergeObjects: string|any[]; spawnTime: {cd: any;}; matter: any;};
	var gameFunctions: {decreaseSpawnCooldown: (arg0: number) => void; maxUpgrades: (arg0: any,arg1: any) => void;};

	interface Document {
		gameiframe: any;
	}

	interface FunctionConstructor {
		events: {[x: string]: any;};
	}
}

// makiki99 prestige-frame*
declare global {
	// makiki99 client_code
	function activatePrestige(a: number,b: number,c: number): void;
	function canActivatePrestige(a: number,b: number,c: number): boolean;
	function getRequirement(a: number,b: number,c: number): number;
}

// youtube.com_lazyPrepareCriticalPages
declare global {
	interface debugI {
		(fn: (...x: any[]) => void,code: string): void;
		get_from: never;
		fn: never;
		__name_list: string[];
		__get_list: string;
		__getter_names: string;
		__ident_chars: string[];
		__ident_start_chars: string[];
		fo: never[][];
		u?: ((fn: (...x: any[]) => void) => void)|undefined;
		f: (...a: any[]) => any;
		cb: () => never;
		fo_test: never;
		__all_vars: string;
		st: Set<never>;
		set_arr: never[];
		ne: never[];
		rx: RxType;
		o: symbol|{[x: string]: never;};
	}
	interface IGame {}
	var game: IGame;
	interface undebugI {
		(fn: (...x: any[]) => any): void;
	}
}

// reddit_continueThread.js
declare global {
	type getSet=["get_set",PropertyDescriptor];
	type Refs=["refs",string,number];
	type S_or=["or",string,never];
	type SRefBase=getSet|Refs|S_or;
}

export {};

declare global {
	class has_expando {
		["jQuery_expando_1"]?: JQueryExpandoData;
	}

	type ExpandoKey=keyof has_expando;

	interface Element {
		["jQuery_expando_1"]?: JQueryExpandoData;
	}

	interface RxType {
		obj_field?: never;
		I_listener?: never;
		jQuery?: {
			G: {
				expando: ExpandoKey;
			};
		};
		game_scope?: never;
	}

	interface GrType {
		m: () => never;
	}

	var __lst: never[];
	var __w: RxType;
	var __r_ret: never;
	var __res: never[];
	var __instance: {constructor: never;};
}

interface JQueryExpandoData {
	events: JQueryEvents;
}

interface JQueryEvents {
	click?: JQueryEventHandler[];
	mouseup?: JQueryEventHandler[];
}

interface JQueryEventHandler {
	handler: (...a: never[]) => never;
}
