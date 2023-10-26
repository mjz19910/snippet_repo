import {FunctionPrototype_SymbolIterator} from "./FunctionPrototype_SymbolIterator.ts";

export interface IteratorPrototype {
	[Symbol.iterator]: FunctionPrototype_SymbolIterator;
}
