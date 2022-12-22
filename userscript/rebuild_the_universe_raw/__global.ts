import {
	CompressState as CompressState_,
	MulCompression as MulCompression_,
} from "../DebugApi_raw/DebugApi.user";
import {AutoBuyImplR, DocumentWriteListImpl} from "./rebuild_the_universe.user";

declare global {
	var MulCompression: typeof MulCompression_;
	type MulCompression=MulCompression_;
}

declare global {
	interface Window {
		document_write_list: DocumentWriteListImpl;
		g_do_load: () => void;
		g_page_content: {request_content: string; cur: string;};
	}
}

// g_mut_observers
declare global {
	interface Window {
		g_mut_observers: any[];
	}
}

declare global {
	var CompressState: typeof CompressState_;
	type CompressState<T,U>=CompressState_<T,U>;
}

declare global {
	interface Window {
		mute(): void;
	}
}

// AutoBuyImplR
declare global {
	interface Window {
		g_auto_buy: AutoBuyImplR;
	}
}

class JQueryRes {
	remove() {}
}

declare global {
	var $: (q: string) => JQueryRes;
}
interface GoogleAdList {
	op: any;
	push(v: number): void;
}

export interface Holder {}

export {};

// #region begin declare_global_sec
// rebuild_the_universe main
declare global {
	interface Document {
		adoptedStyleSheets: CSSStyleSheet[];
		stop(): void;
	}
}

// on_game_data_set
declare global {
	function constelOff(): void;

	interface Window {
		constelOff(): void;
	}
}

// MulCompression
declare global {
	interface Window {
		MulCompression: typeof MulCompression;
	}
}

// AutoBuyState
declare global {
	function calcPres(): number;

	interface Window {
		atomepersecond: number;
		prestige: number;
	}
}
// tonext_async
declare global {
	function Find_ToNext(v: number): number;
	function mainCalc(v: any): void;

	var arUnit: any[];
}

// do_auto_unit_promote
declare global {
	interface Window {
		Get_Unit_Type(v: any): any;
		getUnitPromoCost(v: any): number;
		_targets_achi: any[];
		totalAchi(): number;
		_targets: any[];
		tonext(v: number): void;
	}
}

// on_timers_moved
declare global {
	interface Window {
		_SM_Data: unknown;
	}
}

// AutoBuy
declare global {
	interface Window {
		timeplayed: number;
		secondinterval?: number|undefined;
		doc: Document;
		rounding(v: number,x: any,y: any): string;
		totalAtome: number;
		atomsaccu: number;
		calcPres(): number;
		lightreset(): void;
		specialclick(that: any): void;
		__testing__: false;
		bonusAll(): void;
		allspec: {done: boolean; cost: number;}[];
	}
}

// specialclick_inject
declare global {
	interface Window {
		specialsbought: number;
		atomsinvest: number;
		calcDiff(v: number): number;
		noti: boolean;
		gritter: any;
		toTitleCase(v: string): string;
		plurials(v: string): string;
		arrayNames: string[];
		updateprogress(v: any): void;
		seeUnit(v: number): any;
		checkspec(): void;
		achiSpec(): void;
	}
}

// do_fetch_load
declare global {
	interface Window {
		adsbygoogle: GoogleAdList;
		cint_arr: number[][];
		on_on_timers_moved_first: boolean;
	}
}

// #region end declare_global_sec
