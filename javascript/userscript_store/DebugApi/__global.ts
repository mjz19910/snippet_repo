import {GlobalApiObject} from "./GlobalApiObject";

export {};

declare global {
	interface NodeListOf<TNode extends Node> extends NodeList {
		[Symbol.iterator](): IterableIterator<TNode>;
	}
}

declare global {
	interface WithId {
		id: number;
	}

	interface IdData {
		arr_rep_num: (number|Repeat<number>)[];
		arr_1: (string|number|Repeat<string>|Repeat<number>)[];
		arr_2: (["U",number]|["T",string])[];
		next: WithId;
		rep_arr: (["U", number] | ["T", string])[];
		value: [number,'=',number];
		arr_rep: number[];
		log_val: [number,'=',string, number];
		stats: [string,number][];
		arr_str: string[];
		arr_num: number[];
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
