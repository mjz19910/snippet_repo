import {Interface} from 'readline';
import repl,{REPLServer} from 'repl';

/**@implements {REPLServer} */
export class REPLServerRuntime extends Interface {
	/**@type {REPLServer} */
	X;
	/**
	 * @param {NodeJS.ReadableStream} input
	 * @param {repl.REPLServer} real_value
	 */
	constructor(input, real_value) {
		super(input);
		this.X=real_value;
	}
	get context() {return this.X.context;}
	/** @deprecated Use `input` instead. */
	get inputStream() {return this.X.inputStream;}
	get outputStream() {return this.X.outputStream;}
	get input() {return this.X.input;}
	get output() {return this.X.output;}
	get commands() {return this.X.commands;}
	get editorMode() {return this.X.editorMode;}
	get underscoreAssigned() {return this.X.underscoreAssigned;}
	get underscoreErrAssigned() {return this.X.underscoreErrAssigned;}
	get useColors() {return this.X.useColors;}
	get useGlobal() {return this.X.useGlobal;}
	get ignoreUndefined() {return this.X.ignoreUndefined;}
	get writer() {return this.X.writer;}
	get replMode(){return this.X.replMode;}
	get last() {return this.X.last;}
	/**
	 * @param {string} evalCmd
	 * @param {import("vm").Context} context
	 * @param {string} file
	 * @param {(err: Error | null, result: any) => void} cb
	 */
	eval(evalCmd, context, file, cb) {
		return this.X.eval(evalCmd, context, file, cb);
	}
	get lastError() {return this.X.lastError;}
	get completer() {return this.X.completer;}
	/**
	 * @arg {string} keyword
	 * @arg {repl.REPLCommand | repl.REPLCommandAction} cmd
	 * */
	defineCommand(keyword,cmd) {
		this.X.defineCommand(keyword,cmd);
	}
	/** @param {boolean} [preserveCursor] */
	displayPrompt(preserveCursor) {
		this.X.displayPrompt(preserveCursor);
	}
	clearBufferedCommand() {
		this.X.clearBufferedCommand();
	}
	/**
	 * @type {this['X']['setupHistory']}
	 * @param {string} path
	 * @param {import('REPLServerRuntime.ty.js').CallbackType} callback
	 */
	setupHistory(path, callback) {
		this.X.setupHistory(path, callback)
	}
	historySize=0;
	removeHistoryDuplicates=false;
}
