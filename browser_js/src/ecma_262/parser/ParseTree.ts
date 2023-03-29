import {IParseTreeRoot} from "./IParseTreeRoot.js";

export class ParseTree {
	root: IParseTreeRoot;
	constructor(root: {}) {
		this.root=root;
	}
}
