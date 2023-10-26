import {IterableIteratorPrototype} from "./IterableIteratorPrototype.ts";
import {IteratorPrototype} from "./IteratorPrototype.ts";

export function get_prototype<T>(x: T): T extends IteratorPrototype? Record<string, unknown>:T extends IterableIteratorPrototype? IteratorPrototype:T extends IterableIterator<unknown>? IterableIteratorPrototype:Record<string, unknown> {
	return Object.getPrototypeOf(x);
}
