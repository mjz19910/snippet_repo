interface IterableIterator<T> {
	map<U>(func: (value: T) => U): IterableIterator<U>;
}
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
interface IteratorPrototype {
	[Symbol.iterator]: FunctionPrototype_SymbolIterator;
}
interface FunctionPrototype_SymbolIterator {
	length: 0;
	name: "[Symbol.iterator]";
}
function init_tree() {
	let iterable_map_value=new Map;
	let iterable_map_iterator_values=iterable_map_value.values();
	let iterable_map_iterator_prototype=get_prototype(iterable_map_iterator_values);
	let iterator_prototype=get_prototype(iterable_map_iterator_prototype);
	let object_prototype=get_prototype(iterator_prototype);
	if(object_prototype!==Object.prototype) debugger;
	iterator_prototype;
}
function get_prototype<T>(x: T): T extends IteratorPrototype? Object:T extends IterableIteratorPrototype? IteratorPrototype:T extends IterableIterator<any>? IterableIteratorPrototype:Object {
	return Object.getPrototypeOf(x);
};