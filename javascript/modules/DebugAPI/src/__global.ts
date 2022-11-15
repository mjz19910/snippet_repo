import {GlobalApiObject} from "./GlobalApiObject";
import {MulCompression} from "./MulCompression.js";
import {Repeat} from "./Repeat.js";

export {};

declare global {
	interface NodeListOf<TNode extends Node> extends NodeList {
		[Symbol.iterator](): IterableIterator<TNode>;
	}
}

export class AutoBuy {
	compressor: MulCompression = new MulCompression;
	state_history_arr: string[]=[];
}

export type TU<A,B>=["T", A]|["U", B];

export type X<T>=T|Repeat<T>;
export type TX<A,B>=["T", X<A>]|["U", X<B>];

export type ST={type:symbol} & (new (...args: any) => any);

export type DualR=[false, TU<string,number>[]] | [true, TX<string,number>[]];

export type SafeFunctionPrototype={
	apply: (this: Function, thisArg: any, argArray?: any) => any;
	bind: (this: Function, thisArg: any, ...argArray: any[]) => any;
	call: (this: Function, thisArg: any, ...argArray: any[]) => any;
};

export interface WithId {
	id: number;
}

export interface IDValueData {
	arr_dual: TU<string, number>[];
	arr_dual_x: TU<X<string>,X<number>>[];
	arr_rep_str: X<string>[];
	arr_rep_num: X<number>[];
	arr_str: string[];
	arr_num: number[];
	next: IValue;
	value: [number,'=',number];
	arr_rep: number[];
	log_val: [number,'=',string,number];
	stats: [string,number][];
	stats_win: number;
}

declare global {
	type IValue=WithId&Partial<IDValueData>;



	interface Window {
		g_api: GlobalApiObject;
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
}
