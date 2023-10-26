/*
Object { … }
 next: function next()
 Symbol(Symbol.toStringTag): "Map Iterator"
 <prototype>: Object { … }
*/
export interface IterableIteratorPrototype {
	next: IterableIterator<unknown>["next"];
	map<T,U>(func: (v: T) => U): IterableIterator<U>;
	[Symbol.toStringTag]: "Map Iterator";
}
