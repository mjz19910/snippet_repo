import {GlobalApiObject} from "./GlobalApiObject";

export {};

declare global {
	interface NodeListOf<TNode extends Node> extends NodeList {
		[Symbol.iterator](): IterableIterator<TNode>;
	}
}

declare global {
	class AutoBuy {
		compressor: MulCompression;
		state_history_arr: string[];
	}

	type TU<A,B>=["T", A]|["U", B];

	type X<T>=T|Repeat<T>;
	type TX<A,B>=["T", X<A>]|["U", X<B>];

	type DualR=[false, TU<string,number>[]] | [true, TX<string,number>[]];

	type IValue=WithId&Partial<IDValueData>;

	interface WithId {
		id: number;
	}

	interface IDValueData {
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
