import {RemoteWorkerState} from "./vm/RemoteWorkerState";
import {WorkerState} from "./vm/WorkerState";
import {DocumentWriteList} from "./vm/DocumentWriteList";
import IAutoBuy from "./vm/IAutoBuy";

/* eslint-disable no-undef,no-lone-blocks,no-eval */
// spell:ignore secondinterval atomsaccu
declare global {
	export interface Window {
		proxy_set: any[];
		atomepersecond: number;
		//spell:words totalAtome lightreset totalAchi _targets_achi
		totalAtome: number;
		prestige: number;
		is_in_ignored_fn(): any;
		__testing__: false;
		bonusAll(): void;
		specialclick(index: number): void;
		lightreset(): void;
		timeplayed: number;
		totalAchi(): number;
		_targets_achi: any[];
		arUnit: any[];
		Get_Unit_Type(v: any): any;
		getUnitPromoCost(v: any): number;
		Find_ToNext(v: number): number;
		_targets: any[];
		mainCalc(v: any): void;
		tonext(v: number): void;
		specialsbought: number;
		doc: Document;
		rounding(v: number, x: any, y: any): string;
		atomsinvest: number;
		calcDiff(v: number): number;
		noti: boolean;
		gritter: any;
		toTitleCase(v: string): string;
		cint_arr: (string | number[])[];
		//spell:words adsbygoogle
		adsbygoogle: {
			op: any;
			push(v: number): void;
		};
		plurials(v: string): string;
		arrayNames: string[];
		updateprogress(v: any): void;
		seeUnit(v: number): any;
		checkspec(): void;
		achiSpec(): void;
		Pace: {
			bar: {
				progress: number;
				finish: Function;
			};
		};
		_SM_Data: any;
		on_on_timers_moved_first: boolean;
		da: any[];
		lightreset(): void;
		specialclick(that: any): void;
		secondinterval?: number;
		atomsaccu: number;
		calcPres(): number;
		g_auto_buy: IAutoBuy;
		g_proxy_state: {hand: {stack_overflow_check: () => any; count_arr: any[];};};
		remoteSetTimeout: (handler: TimerHandler, timeout?: number, ...target_args: any[]) => number;
		remoteSetInterval: (handler: TimerHandler, timeout?: number, ...target_args: any[]) => number;
		remoteClearTimeout: (id?: number) => void;
		remoteClearInterval: (id?: number) => void;
		["g_worker_state"]?: WorkerState;
		mute(): void;
		g_mut_observers: any[];
		g_cs?: any[];
		g_page_content: {
			request_content: string;
			cur: string;
		};
		g_do_load: ((promise_accept: (value: any) => void) => void) | undefined;
		document_write_list:DocumentWriteList;
		allspec:any[];
		$:JQueryStatic;
	}
	export var window: Window & typeof globalThis;
	export var Window: {
		prototype: Window;
		new(): Window;
	};

	export interface ErrorConstructor {
		new(message?: string): Error;
		(message?: string): Error;
		readonly prototype: Error;
		captureStackTrace<T>(obj: {stack?: string;}, constructorOpt?: T): void;
	}
	module globalThis {
		var remote_worker_state: RemoteWorkerState;
	}
	interface HTMLDivElement {
		style: CSSStyleDeclaration;
	}
	interface Document {
		adoptedStyleSheets: CSSStyleSheet[];

		// don't make an error, just do nothing
		stop(): void;
	}
	interface CSSStyleSheet extends StyleSheet {
		replace(string: string): Promise<CSSStyleSheet>;
	}
	export namespace WebAssembly {
		var Function: new (types: {parameters: string[]; results: string[];}, arg1: (...v: any[]) => any) => any;
	}
}
