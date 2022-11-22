
export {Holder} from "./Holder.js";
export {KeepList} from "./KeepList.js";

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
	}

	var EventTarget: {
		prototype: EventTarget;
		new(): EventTarget;
		events: any;
		syms: any;
		state: any;
	};

	interface FunctionConstructor {
		events: {[x: string]: any;};
	}
}

// kongregate_yet-another-merge-game.js
declare global {
	interface Window {
		cint?: ReturnType<typeof setTimeout>;
		citv?: ReturnType<typeof setInterval>;
	}
}

// makiki99 prestige-frame*
declare global {
	// client_code
	function activatePrestige(a,b,c): void;
	function canActivatePrestige(a,b,c): boolean;
	function getRequirement(a,b,c): number;

	// prestige-frame
	interface Window {
		HTMLIFrameExt: typeof HTMLIFrameElement;
	}
}

// youtube.com_lazyPrepareCriticalPages
declare global {
	var debug: debug|undefined;
	interface debug {
		(arg0: ()=>void, code: string): void;
		u: (arg0: any) => void;
		f:()=>void;
		cb: {
			xmhrp: {send():void}|null;
		};
	}
	var undebug: undebug|undefined;
	interface undebug {
		(arg0: ()=>void): void;
	}
}
