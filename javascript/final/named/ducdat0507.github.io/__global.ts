export {};

declare global {
	interface Window {
		debug?:debug;
		undebug?:undebug;
		dz?: any;
	}

	interface undebug {
		(fn: ()=>void): void;
	}

	interface debug {
		(fn:()=>void, code:string): void;
		fo:any;
		gr: any;
		o: any;
	}

	var debug: debug|undefined;
	var __r_ret: any;
	var __nx_names: never[];
	var layers: {aspTime: {buyables: {cost: (arg0: any) => any;}[];};};
	var player: {};
	var Decimal: new (arg0: any) => any;
	function buyBuyable(a: string,b: number):void;
}
