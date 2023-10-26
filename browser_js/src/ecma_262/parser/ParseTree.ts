import {IParseTreeRoot} from "./IParseTreeRoot.ts";

export class ParseTree {
	root: IParseTreeRoot;
	constructor(root: {}) {
		this.root=root;
	}
}
