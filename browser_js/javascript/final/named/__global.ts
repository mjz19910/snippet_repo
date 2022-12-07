<<<<<<< HEAD
import {__RetType} from "./__RetType";
=======
import {SubARet} from "../../group1/sub_a/types/item_2_support.js";
import {Runner} from "../support/Runner.js";

// __m
declare global {
	var __m: {}|null;
}
>>>>>>> e10fb913 (u)

// __ret
declare global {
	interface Window {
<<<<<<< HEAD
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
		cint?: ReturnType<typeof window.setTimeout>|number;
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

=======
		__ret: __RetType;
	}
}

type __RetType={
	type:"site",
	from:"1000mines.com",
	ret:symbol|[any,any],
}|{
	type:"runner",
	value: Runner,
}|{
	type: "sub_a",
	ret: SubARet;
};


// captureStackTrace
interface ErrorStackTrace {
	stack?: string;
}
declare global {
	interface ErrorConstructor {
		captureStackTrace<T>(obj: ErrorStackTrace,constructorOpt?: T): void;
	}
}


>>>>>>> e10fb913 (u)
// lunar-atoms-tycoon.js
declare global {
	var Upgrade: {apply: (arg0: any) => {(): any; new(): any; toNumber: {(): any; new(): any;};};};
	type GameType={upgrades: {maxObjects: any;}; mergeObjects: string|any[]; spawnTime: {cd: any;}; matter: any;};
	var gameFunctions: {decreaseSpawnCooldown: (arg0: number) => void; maxUpgrades: (arg0: any,arg1: any) => void;};

	interface Document {
		gameiframe: any;
	}

<<<<<<< HEAD
=======
	interface Window {
		event_info: any;
		x2: any;
		events: any;
		syms: any;
		state: any;
	}

>>>>>>> e10fb913 (u)
	interface FunctionConstructor {
		events: {[x: string]: any;};
	}
}

<<<<<<< HEAD
// makiki99 prestige-frame*
declare global {
	// makiki99 client_code
	function activatePrestige(a: number,b: number,c: number): void;
	function canActivatePrestige(a: number,b: number,c: number): boolean;
	function getRequirement(a: number,b: number,c: number): number;
=======
// kongregate_yet-another-merge-game.js
declare global {
	interface Window {
		cint?: ReturnType<typeof window.setTimeout>|number;
		citv?: ReturnType<typeof window.setInterval>|number;
	}
}

// makiki99 prestige-frame*
declare global {
	// client_code
	function activatePrestige(a: number,b: number,c: number): void;
	function canActivatePrestige(a: number,b: number,c: number): boolean;
	function getRequirement(a: number,b: number,c: number): number;

	// prestige-frame
	interface Window {
		HTMLIFrameExt: typeof HTMLIFrameElement;
	}
>>>>>>> e10fb913 (u)
}

// youtube.com_lazyPrepareCriticalPages
declare global {
<<<<<<< HEAD
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
=======
	var debug: debug|undefined;
	interface debug {
		(arg0: (...x:any[]) => any,code: string): void;
		u?: (fn: (...x: any[]) => void) => void;
		f: (...a: any[]) => any;
		cb: () => any;
		fo_test: any;
	}
	var undebug: undebug|undefined;
	interface undebug {
		(arg0: (...x:any[]) => any): void;
>>>>>>> e10fb913 (u)
	}
}

// reddit_continueThread.js
declare global {
<<<<<<< HEAD
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
=======
	interface Window {
		react_ii: string;
		root_new: any;
		inner_dom: any;
		refs: any[];
		s_refs: (["get_set",PropertyDescriptor]|["refs",string,number]|["or",string,any])[][]|undefined;
	}
}

export {type Holder} from "./Holder.js";
>>>>>>> e10fb913 (u)
