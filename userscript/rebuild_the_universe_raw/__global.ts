export interface Holder {}

export {}
// #pragma section begin declare_global_sec
// rebuild_the_universe main
declare global {
	interface Document {
		adoptedStyleSheets: CSSStyleSheet[];
		stop(): void;
	}
}

// on_game_data_set
declare global {
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
	interface Window {
		atomepersecond: number;
		prestige: number;
	}
}

// do_auto_unit_promote
declare global {
	interface Window {
		arUnit: any[];
		Get_Unit_Type(v: any): any;
		getUnitPromoCost(v: any): number;
		Find_ToNext(v: number): number;
		_targets_achi: any[];
		totalAchi(): number;
		_targets: any[];
		mainCalc(v: any): void;
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
		allspec: {}[];
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
// #pragma section end declare_global_sec
