import * as repl from "repl";

export class ReplSupport {
	base_repl;
	constructor() {
		this.base_repl=repl.start("");
	}
	/**
	 * @param {boolean | undefined} [preserveCursor]
	 */
	displayPrompt(preserveCursor) {
		this.base_repl.displayPrompt(preserveCursor);
	}
	get context() {
		return this.base_repl.context;
	}
	repl_active=false;
}
