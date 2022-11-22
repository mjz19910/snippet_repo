import {Impl} from "./Impl";

export {};

declare global {
	interface Window {
		CustomInputMatcher: typeof CustomInputMatcher;
		debugApi: {};
		__ret: {};
	}

	var debugApi: Impl.DebugAPI;
	var CustomInputMatcher: typeof Impl.CustomInputMatcher;

	var __ret: any;
}

declare global {
	var DebugAPI: typeof Impl.DebugAPI;
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
