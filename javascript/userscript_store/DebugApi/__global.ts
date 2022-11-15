import {GlobalApiObject} from "./GlobalApiObject";

export {};

declare global {
	interface NodeListOf<TNode extends Node> extends NodeList {
		[Symbol.iterator](): IterableIterator<TNode>;
	}
}

declare global {
	interface WithNext {
		rep_arr?: any[];
		value?: any[];
		log_val?: boolean[];
		id: number;
		arr_rep: number[];
		next?: WithNext;
		stats?: [string,number][];
		arr: any[];
		stats_win?: number;
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
