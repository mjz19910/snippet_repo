import {rebuild_the_universe_plugin} from "./rebuild_the_universe.user.js";


declare global {
	export interface Window {
		document_write_list: InstanceType<typeof rebuild_the_universe_plugin.DocumentWriteListImpl>;
		g_do_load: () => void;
		g_page_content: {request_content: string; cur: string;};
	}
}

// g_mut_observers
declare global {
	export interface Window {g_mut_observers: unknown[];}
}

declare global {
	export interface Window {mute(): void;}
}

// AutoBuyImplR
declare global {
	export interface Window {g_auto_buy: InstanceType<typeof rebuild_the_universe_plugin.AutoBuyImplR>;}
}

interface GoogleAdList {
	op: unknown;
	push(v: number): void;
}

export {};
// #region begin declare_global_sec
// rebuild_the_universe main
declare global {
	export interface Document {
		adoptedStyleSheets: CSSStyleSheet[];
		stop(): void;
	}
}

// on_game_data_set
declare global {
	export function constelOff(): void;

	export interface Window {constelOff(): void;}
}

// AutoBuyState
declare global {
	export function calcPres(): number;

	export interface Window {
		atomepersecond: number;
		prestige: number;
	}
}
export type Typeof_arUnit=[unknown,unknown,unknown,number,number,number,unknown,unknown,unknown,unknown,unknown,unknown,unknown,unknown,unknown,unknown,boolean,number[]][];
// tonext_async
declare global {
	export function Find_ToNext(v: number): number;
	export function mainCalc(v: unknown): void;

	export interface Window {
		arUnit: Typeof_arUnit;
	}
}

// do_auto_unit_promote
declare global {
	export interface Window {
		Get_Unit_Type(v: unknown): [unknown,unknown,number[]];
		getUnitPromoCost(v: unknown): number;
		_targets_achi: unknown[];
		totalAchi(): number;
		_targets: unknown[];
		tonext(v: number): void;
	}
}

// on_timers_moved
declare global {
	export interface Window {_SM_Data: unknown;}
}

// AutoBuy
declare global {
	export interface Window {
		timeplayed: number;
		secondinterval?: number|undefined;
		doc: Document;
		rounding(v: number,x: unknown,y: unknown): string;
		totalAtome: number;
		atomsaccu: number;
		calcPres(): number;
		lightreset(): void;
		specialclick(that: unknown): void;
		__testing__: false;
		bonusAll(): void;
		allspec: {done: boolean; cost: number;}[];
	}
}

// specialclick_inject
declare global {
	export interface Window {
		specialsbought: number;
		atomsinvest: number;
		calcDiff(v: number): number;
		noti: boolean;
		gritter: unknown;
		toTitleCase(v: string): string;
		plurials(v: string): string;
		arrayNames: string[];
		updateprogress(v: unknown): void;
		seeUnit(v: number): unknown;
		checkspec(): void;
		achiSpec(): void;
	}
}

// do_fetch_load
declare global {
	export interface Window {
		adsbygoogle: GoogleAdList;
		cint_arr: number[][];
		on_on_timers_moved_first: boolean;
	}
}

// #region end declare_global_sec
