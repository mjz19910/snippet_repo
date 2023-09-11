import {IterableIteratorPrototype} from "./IterableIteratorPrototype.js";
import {IteratorPrototype} from "./IteratorPrototype.js";

export function get_prototype<T>(x: T): T extends IteratorPrototype? Object:T extends IterableIteratorPrototype? IteratorPrototype:T extends IterableIterator<any>? IterableIteratorPrototype:Object {
	return Object.getPrototypeOf(x);
}
