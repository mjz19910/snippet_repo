export type dbg_result=import("./support/dbg/dbg_result.js").dbg_result_;

declare global {
	export interface Node {
		__id_holder?: {
			value: number;
		};
	}
}
declare global {
	export interface NodeListOf<TNode extends Node> extends NodeList {
		[Symbol.iterator](): IterableIterator<TNode>;
	}
}
