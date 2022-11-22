
export {};

import {CustomInputMatcherKeepspace} from "./CustomInputMatcherKeepspace.js";

export type KeepList=[
	CustomInputMatcherKeepspace.Keep,
];


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

declare global {
	interface Window {
		cint?: ReturnType<typeof setTimeout>;
		citv?: ReturnType<typeof setInterval>;
	}
}
