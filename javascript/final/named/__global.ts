export {Holder} from "./Holder.js";

// captureStackTrace
interface ErrorStackTrace {
	stack?: string;
}
declare global {
	interface ErrorConstructor {
		captureStackTrace<T>(obj: ErrorStackTrace,constructorOpt?: T): void;
	}
}


// lunar-atoms-tycoon.js
declare global {
	var Upgrade: {apply: (arg0: any) => {(): any; new(): any; toNumber: {(): any; new(): any;};};};
	var game: {upgrades: {maxObjects: any;}; mergeObjects: string|any[]; spawnTime: {cd: any;}; matter: any;};
	var gameFunctions: {decreaseSpawnCooldown: (arg0: number) => void; maxUpgrades: (arg0: any,arg1: any) => void;};

	interface Document {
		gameiframe: any;
	}

	interface Window {
		event_info: any;
		x2: any;
		events: any;
		syms: any;
		state: any;
	}

	interface FunctionConstructor {
		events: {[x: string]: any;};
	}
}

// kongregate_yet-another-merge-game.js
declare global {
	interface Window {
		cint?: ReturnType<typeof setTimeout>|number;
		citv?: ReturnType<typeof setInterval>|number;
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
}

// youtube.com_lazyPrepareCriticalPages
declare global {
	var debug: debug|undefined;
	interface debug {
		(arg0: (...x:any[]) => any,code: string): void;
		u: (fn: (...x: any[]) => void) => void;
		f: (...a: any[]) => any;
		cb: () => any;
		fo_test: any;
	}
	var undebug: undebug|undefined;
	interface undebug {
		(arg0: (...x:any[]) => any): void;
	}
}

// reddit_continueThread.js
declare global {
	interface Window {
		react_ii: string;
		root_new: any;
		inner_dom: any;
		refs: any[];
		s_refs: (["get_set",PropertyDescriptor]|["refs",string,number]|["or",string,any])[][]|undefined;
	}
}
