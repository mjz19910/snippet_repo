function get_prototype<T>(x: T): T extends IteratorPrototype? Object:T extends IterableIteratorPrototype? IteratorPrototype:T extends IterableIterator<any>? IterableIteratorPrototype:Object {
	return Object.getPrototypeOf(x);
}
