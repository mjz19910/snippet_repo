import {RemoteWorkerState} from "./vm/RemoteWorkerState.js";
import {WorkerState} from "./vm/WorkerState.js";
import {DocumentWriteList} from "./vm/DocumentWriteList.js";
import {AutoBuy} from "./vm/AutoBuy.js";
import {DebugAPI} from "./DebugAPI.js";
import {GenericDataEvent} from "./vm/GenericDataEvent.js";
import {GlobalStateKey} from "./vm/GlobalStateKey.js";
import {MulCompression} from "./vm/MulCompression.js";
import {l_log_if} from "./vm/l_log_if.js";
import {SpecType} from "./SpecType.js";
import {PaceType} from "./PaceType.js";

export {};

declare global {

	interface Window {
		g_log_if: typeof l_log_if;
	}

	interface Window {
		MulCompression: typeof MulCompression;
	}

	interface Window {
		document_write_list: DocumentWriteList;

		adsbygoogle: {
			op: any;
			push(v: number): void;
		};

		cint_arr: (string|number[])[];

		on_on_timers_moved_first: boolean;

		remoteSetTimeout: (handler: TimerHandler,timeout?: number,...target_args: any[]) => number;
		remoteSetInterval: (handler: TimerHandler,timeout?: number,...target_args: any[]) => number;
		remoteClearTimeout: (id?: number) => void;
		remoteClearInterval: (id?: number) => void;

		_SM_Data: unknown;

		Pace: PaceType;

		$: JQueryStatic;

		proxy_set: ((...args: any[]) => any)[];

		timeplayed: number;
		secondinterval?: ReturnType<typeof setInterval>;
		doc: Document;
		rounding(v: number,x: any,y: any): string;
		totalAtome: number;
		atomsaccu: number;
		calcPres(): number;
		lightreset(): void;
		specialclick(that: any): void;
		__testing__: false;
		bonusAll(): void;
		allspec: SpecType[];

		atomepersecond: number;
		prestige: number;

		arUnit: any[];
		Get_Unit_Type(v: any): any;
		getUnitPromoCost(v: any): number;
		Find_ToNext(v: number): number;
		_targets_achi: any[];
		totalAchi(): number;
		_targets: any[];
		mainCalc(v: any): void;
		tonext(v: number): void;

		g_auto_buy: AutoBuy;

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

		is_in_ignored_fn(): boolean;
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
		constelOff(): void;
		lightreset(): void;
		specialclick(that: any): void;
		calcPres(): number;
		g_proxy_state: {
			hand: {
				stack_overflow_check: () => any;
				count_arr: any[];
			};
		};
		[GlobalStateKey]?: WorkerState;
		mute(): void;
		g_mut_observers: any[];
		g_cs?: any[];
		g_page_content: {
			request_content: string;
			cur: string;
		};
		g_do_load: ((promise_accept: (value: any) => void) => void)|undefined;
	}

	// JQuery
	interface Window {
		$: JQueryStatic;
	}

	// DebugAPI
	interface Window {
		DebugAPI: DebugAPI;
		GenericDataEvent: typeof GenericDataEvent;
	}

	var window: Window&typeof globalThis;
	var Window: {
		prototype: Window;
		new(): Window;
	};

	interface ErrorConstructor {
		new(message?: string): Error;
		(message?: string): Error;
		readonly prototype: Error;
		captureStackTrace<T>(obj: {stack?: string;},constructorOpt?: T): void;
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
	interface String {
		/**
		 * Replace all instances of a substring in a string, using a regular expression or search string.
		 * @param searchValue A string to search for.
		 * @param replaceValue A string containing the text to replace for every successful match of searchValue in this string.
		 */
		replaceAll(searchValue: string|RegExp,replaceValue: string): string;

		/**
		 * Replace all instances of a substring in a string, using a regular expression or search string.
		 * @param searchValue A string to search for.
		 * @param replacer A function that returns the replacement text.
		 */
		replaceAll(searchValue: string|RegExp,replacer: (substring: string,...args: any[]) => string): string;
	}
	interface WeakRef<T extends object> {
		readonly [Symbol.toStringTag]: "WeakRef";

		/**
		 * Returns the WeakRef instance's target object, or undefined if the target object has been
		 * reclaimed.
		 */
		deref(): T|undefined;
	}

	interface WeakRefConstructor {
		readonly prototype: WeakRef<any>;

		/**
		 * Creates a WeakRef instance for the given target object.
		 * @param target The target object for the WeakRef instance.
		 */
		new <T extends object>(target: T): WeakRef<T>;
	}

	var WeakRef: WeakRefConstructor;

	interface FinalizationRegistry<T> {
		readonly [Symbol.toStringTag]: "FinalizationRegistry";

		/**
		 * Registers an object with the registry.
		 * @param target The target object to register.
		 * @param heldValue The value to pass to the finalizer for this object. This cannot be the
		 * target object.
		 * @param unregisterToken The token to pass to the unregister method to unregister the target
		 * object. If provided (and not undefined), this must be an object. If not provided, the target
		 * cannot be unregistered.
		 */
		register(target: object,heldValue: T,unregisterToken?: object): void;

		/**
		 * Unregisters an object from the registry.
		 * @param unregisterToken The token that was used as the unregisterToken argument when calling
		 * register to register the target object.
		 */
		unregister(unregisterToken: object): void;
	}

	interface FinalizationRegistryConstructor {
		readonly prototype: FinalizationRegistry<any>;

		/**
		 * Creates a finalization registry with an associated cleanup callback
		 * @param cleanupCallback The callback to call after an object in the registry has been reclaimed.
		 */
		new <T>(cleanupCallback: (heldValue: T) => void): FinalizationRegistry<T>;
	}

	var FinalizationRegistry: FinalizationRegistryConstructor;
}
