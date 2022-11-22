import {Impl} from "./Impl";

export {};

declare global {
	interface Window {
		CustomInputMatcher: typeof CustomInputMatcher;
		debugApi: {};
		__ret: {};
	}

	var debugApi: Impl.DebugAPI;
	var CustomInputMatcher: typeof X.CustomInputMatcher;

	var __ret: any;
	var __w: {I_listener: any; game_scope: any; obj_field?: any;};
	var __m: {click: (arg0: number,arg1: number) => void; opened: {field: {[x: string]: undefined;}; get: (arg0: number,arg1: number) => boolean;}; mines: {field: {[x: string]: boolean;};};}|null;
	var __r_ret: any;
	var __res: any[];
	var __instance: {constructor: any;};
	var __nx_names: never[];

	var Upgrade: {apply: (arg0: any) => {(): any; new(): any; toNumber: {(): any; new(): any;};};};
	var game: {upgrades: {maxObjects: any;}; mergeObjects: string|any[]; spawnTime: {cd: any;}; matter: any;};
	var gameFunctions: {decreaseSpawnCooldown: (arg0: number) => void; maxUpgrades: (arg0: any,arg1: any) => void;};

	interface Document {
		gameiframe: any;
	}
}
namespace X {
	export class CustomInputMatcher {
		test_string: string|RegExp;
		test_needle: string|RegExp;
		ts_get: unknown;
		str?: string;
		constructor(test_string: string|RegExp,string_getter: unknown) {
			this.test_string=test_string;
			this.test_needle="";
			this.ts_get=string_getter;
		}
	}
}

declare global {
	interface Window {
		cint?: number;
		citv?: number;
	}
	var cint: ReturnType<typeof setTimeout>|undefined;
	var citv: ReturnType<typeof setInterval>|undefined;
}

declare global {
	var DebugAPI: typeof Impl.DebugAPI;
}

// lunar-atoms-tycoon.js
declare global {
	interface Window {
		event_info;
		x2;
	}

	var EventTarget: {
		prototype: EventTarget;
		new(): EventTarget;
		events: any;
		syms: any;
		state;
	};

	interface FunctionConstructor {
		events;
	}
}
