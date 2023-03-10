//@@iterator for NodeListOf
interface NodeListOf<TNode extends Node> extends NodeList {[Symbol.iterator](): IterableIterator<TNode>;}
