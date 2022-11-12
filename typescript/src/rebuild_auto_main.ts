import {PaceType} from "./PaceType.js";
import {SpecType} from "./SpecType.js";
import {AutoBuy} from "./vm/AutoBuy.js";
import {DocumentWriteList} from "./vm/DocumentWriteList.js";
import {dom_add_elm_filter} from "./vm/dom_add_elm_filter.js";
import {move_timers_to_worker_promise_executor} from "./vm/move_timers_to_worker_promise_executor.js";
import {on_timers_moved} from "./vm/on_timers_moved.js";
import {proxy_jquery} from "./vm/proxy_jquery.js";
import {RemoteWorkerState} from "./vm/RemoteWorkerState.js";
import {remove_bad_dom_script_element} from "./vm/remove_bad_dom_script_element.js";

declare global {
	// rebuild_auto_main.ts
	interface Window {
		document_write_list: DocumentWriteList;
		adsbygoogle: {
			op: any;
			push(v: number): void;
		};
		cint_arr: (string|number[])[];
		on_on_timers_moved_first: boolean;
	}

	// rebuild_auto_main.ts
	interface Document {
		adoptedStyleSheets: CSSStyleSheet[];

		// don't make an error, just do nothing
		stop(): void;
	}


	// move_timers_to_worker_promise_executor.ts
	interface Window {
		remoteSetTimeout: (handler: TimerHandler,timeout?: number,...target_args: any[]) => number;
		remoteSetInterval: (handler: TimerHandler,timeout?: number,...target_args: any[]) => number;
		remoteClearTimeout: (id?: number) => void;
		remoteClearInterval: (id?: number) => void;
	}

	// move_timers_to_worker_promise_executor.ts
	module globalThis {
		var remote_worker_state: RemoteWorkerState;
	}


	// on_timers_moved.ts
	interface Window {
		_SM_Data: unknown;
	}


	// on_game_data_set.ts
	interface Window {
		Pace: PaceType;
	}


	// use_jquery.ts
	interface Window {
		$: JQueryStatic;
	}


	// script_registry/main.ts
	interface Window {
		proxy_set: ((...args: any[]) => any)[];
	}


	// AutoBuy.ts
	interface Window {
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
	}


	// AutoBuyState.ts
	interface Window {
		atomepersecond: number;
		prestige: number;
	}


	// do_auto_unit_promote.ts
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


	// lightreset_inject.ts
	interface Window {
		g_auto_buy: AutoBuy;
	}


	// specialclick_inject.ts
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

export const cint_arr: (string|number[])[]=[];

export function rebuild_auto_main() {
	let enable_proxy=true;
	window.cint_arr=cint_arr;
	if(enable_proxy) {
		proxy_jquery();
	}
	let adsbygoogle=window.adsbygoogle;
	let new_arr=[] as unknown as {
		op: any;
		push(v: number): void;
	};
	window.adsbygoogle=new_arr;
	adsbygoogle.op=adsbygoogle.push;
	adsbygoogle.push=function(e: any) {
		adsbygoogle.op(e);
		remove_bad_dom_script_element();
	};
	var prev_node_prototype_insertBefore=Node.prototype.insertBefore;
	document.addEventListener('onContentLoaded',remove_bad_dom_script_element);
	Node.prototype.insertBefore=(<any>function <T extends Node>(this: T,node: T,child: Node|null,...rest: []) {
		console.assert(rest.length===0,"unexpected arguments for overwritten Node.prototype.insertBefore");
		let should_insert_1,should_insert_2;
		if(node instanceof HTMLScriptElement) {
			should_insert_1=dom_add_elm_filter(node);
		}
		if(child instanceof HTMLScriptElement) {
			should_insert_2=dom_add_elm_filter(child);
		}
		if(!should_insert_1||!should_insert_2)
			return node;
		return prev_node_prototype_insertBefore.call(this,node,child);
	});
	remove_bad_dom_script_element();
	window.on_on_timers_moved_first=true;
	let move_timers_to_worker=new Promise(move_timers_to_worker_promise_executor);
	move_timers_to_worker.then(on_timers_moved);
	setTimeout(remove_bad_dom_script_element,0);
	window.document_write_list=new DocumentWriteList;
	window.document_write_list.attach_proxy(document);
	document.stop=function() {};
}
