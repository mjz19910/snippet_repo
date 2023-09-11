import {FunctionPrototype_SymbolIterator} from "./FunctionPrototype_SymbolIterator.js";

export interface IteratorPrototype {
	[Symbol.iterator]: FunctionPrototype_SymbolIterator;
}
