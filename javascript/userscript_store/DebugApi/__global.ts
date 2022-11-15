import {GlobalApiObject} from "./GlobalApiObject";

export {};

declare global {
	interface NodeListOf<TNode extends Node> extends NodeList {
		[Symbol.iterator](): IterableIterator<TNode>;
	}
}

declare global {
	interface NewType {
		id: number;
		next: {
			arr: any;
			rep_arr: any[];
			log_val: any[];
			value: any[];
			id: number;
		};
		stats: [string, number][];
		arr: any[];
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
