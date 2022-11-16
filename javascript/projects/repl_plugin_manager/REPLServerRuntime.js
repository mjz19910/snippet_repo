import {Interface} from 'readline';
import repl,{REPLServer} from 'repl';
import {any} from '../browser_fake_dom/src/any.js';


/**@implements {REPLServer} */
export class REPLServerRuntime extends Interface {
	/**@arg {string | repl.ReplOptions} [options] @returns {REPLServerRuntime} */
	static start_repl(options) {
		let repl_base=repl.start(options);
		let repl_this=new REPLServerRuntime(repl_base.input,repl_base);
		return any(repl_base);
	}
	/**@type {REPLServer} */
	X;
	/**
	 * @param {NodeJS.ReadableStream} input
	 * @param {repl.REPLServer} real_value
	 */
	constructor(input, real_value) {
		debugger;
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
