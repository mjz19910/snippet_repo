/* Object { … }
 ​
next: function next()
 ​
Symbol(Symbol.toStringTag): "Map Iterator"
 ​
<prototype>: Object { … }
*/
interface IterableIteratorPrototype {
	next: IterableIterator<any>["next"];
	map<T,U>(func: (v: T) => U): IterableIterator<U>;
	[Symbol.toStringTag]: "Map Iterator";
}
