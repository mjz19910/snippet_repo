import {Interface} from 'readline';
import repl,{REPLServer} from 'repl';
import {EventEmitter} from 'stream';
import {any} from '../browser_fake_dom/src/any.js';

/**@template T */
class XHolder {
	/**@type {T} */
	X;
	/**
	 * @param {T} x_val
	 */
	constructor(x_val) {
		this.X=x_val;
	}
}


/**@implements {EventEmitter} @extends {XHolder<EventEmitter>} */
class NodeEventEmitter extends XHolder {
	/** @param {string} event_name */
	listeners(event_name) {
		return this.X.listeners(event_name);
	}
	/** @param {string} event_name */
	rawListeners(event_name) {
		return this.X.rawListeners(event_name);
	}
	/** @param {string | symbol} eventName */
	listenerCount(eventName) {
		return this.X.listenerCount(eventName);
	}
	eventNames() {
		return this.X.eventNames();
	}
	/** @param {[event: string, listener: (...args: any[]) => void]} args */
	off(...args) {
		this.X.off(...args);
		return this;
	}
	removeAllListeners() {
		this.X.removeAllListeners();
		return this;
	}
	/** @param {number} n */
	setMaxListeners(n) {
		this.X.setMaxListeners(n);
		return this;
	}
	getMaxListeners() {
		return this.X.getMaxListeners();
	}
	/** @param {[event: string, listener: (...args: any[]) => void]} args */
	prependListener(...args) {
		this.X.prependListener(...args);
		return this;
	}
	/** @param {[event: string, listener: (...args: any[]) => void]} args */
	prependOnceListener(...args) {
		this.X.prependOnceListener(...args);
		return this;
	}
	/** @param {[event: string | symbol, listener: (...args: any[]) => void]} args */
	removeListener(...args) {
		this.X.removeListener(...args);
		return this;
	}
	/** @param {[event: string, listener: (...args: any[]) => void]} args */
	addListener(...args) {
		this.X.addListener(...args);
		return this;
	}
	/** @param {[event: string | symbol, ...args: any[]]} args */
	emit(...args) {
		return this.X.emit(...args);
	}
	/** @param {[event: string, listener: (...args: any[]) => void]} args */
	on(...args) {
		this.X.on(...args);
		return this;
	}
	/** @param {[event: string, listener: (...args: any[]) => void]} args */
	once(...args) {
		this.X.once(...args);
		return this;
	}
}

/**@implements {Interface} */
class RLInterface extends NodeEventEmitter {
	get [Symbol.asyncIterator]() {
		return this.X[Symbol.asyncIterator].bind(this.X);
	}
	resume() {
		this.X.resume();
		return this;
	}
	close() {
		this.X.close();
	}
	/** @param {[data: string | Buffer, key?: import('readline').Key | undefined]} args */
	write(...args) {
		return this.X.write(...args);
	}
	getCursorPos() {
		return this.X.getCursorPos();
	}
	/**
	 * @param {Interface} base_val
	 */
	constructor(base_val) {
		super(base_val);
		this.X=base_val;
	}
	get terminal() {
		return this.X.terminal;
	}
	get line() {
		return this.X.line;
	}
	get cursor() {
		return this.X.cursor;
	}
	getPrompt() {
		return this.X.getPrompt();
	}
	/**
	 * @param {string} value
	 */
	setPrompt(value) {
		return this.X.setPrompt(value);
	}
	prompt() {}
	/**
	 * @arg {[query: string, callback: (answer: string) => void]|[query: string, options: EventEmitter.Abortable,callback: (answer: string) => void]} args
	 */
	question(...args) {
		if(args.length==2) {
			this.X.question(...args);
		} else {
			this.X.question(...args);
		}
		return this;
	}
	pause() {
		let vv=this.X.pause();
		if(this.X!==vv) {
			this.X=vv;
		}
		return this;
	}
}


/**@implements {REPLServer} */
export class REPLServerRuntime extends RLInterface {
	/**@arg {string | repl.ReplOptions} [options] @returns {REPLServerRuntime} */
	static start_repl(options) {
		return new REPLServerRuntime(repl.start(options));
	}
	/**@type {REPLServer} */
	X;
	/**
	 * @param {REPLServer} real_value
	 */
	constructor(real_value) {
		super(real_value);
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
	get replMode() {return this.X.replMode;}
	get last() {return this.X.last;}
	/**
	 * @param {string} evalCmd
	 * @param {import("vm").Context} context
	 * @param {string} file
	 * @param {(err: Error | null, result: any) => void} cb
	 */
	eval(evalCmd,context,file,cb) {
		return this.X.eval(evalCmd,context,file,cb);
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
	 * @param {import('./REPLServerRuntime.ty.js').CallbackType} callback
	 */
	setupHistory(path,callback) {
		this.X.setupHistory(path,callback);
	}
	historySize=0;
	removeHistoryDuplicates=false;
}
