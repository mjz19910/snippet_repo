import {Runner} from "../../support/Runner.js";

export {};

declare global {
	interface Window {
		__ret: {};
		debug?:debug;
		undebug?:undebug;
		find_closed_up_x: any;
		find_closed_up_y: any;
		find_closed_dn_x: any;
		find_closed_dn_y: any;
		dz?: any;
	}

	type SymbolIndexable={
		[x: symbol]: any;
	}

	interface undebug {
		(fn: ()=>void): void;
	}
	var undebug: undebug;

	interface debug {
		(fn:()=>void, code:string): void;
		u:any;
		fo:any;
		st: any;
		sarr: any;
		ne: any;
		cb: any;
		__trg_eval: any;
		gr: any;
		rx: any;
		o: any;
		f: any;
	}

	var debug: debug|undefined;
	var __fo: any;
	var __lst: any;
	var __ret: Runner;
	var __w: any;
	var __m: any;
	var __r_ret: any;
	var __res: any;
	var __instance: any;
	var __nx_names: never[];
	var layers: {aspTime: {buyables: {cost: (arg0: any) => any;}[];};};
	var player: {aspTime: {buyables: any[]; points: {lt: (arg0: any) => any;};};};
	var Decimal: new (arg0: any) => any;
	function buyBuyable(a: string,b: number):void;
}
