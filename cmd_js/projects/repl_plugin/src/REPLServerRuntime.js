import {Interface} from 'readline';
import repl,{REPLServer} from 'repl';
import {XHolder} from './XHolder.js';

/**@implements {NodeJS.EventEmitter} @extends {XHolder<NodeJS.EventEmitter>} */
class NodeEventEmitter extends XHolder {
	/** @arg {string} event_name */
	listeners(event_name) {
		return this.X.listeners(event_name);
	}
	/** @arg {string} event_name */
	rawListeners(event_name) {
		return this.X.rawListeners(event_name);
	}
	/** @arg {string|symbol} eventName */
	listenerCount(eventName) {
		return this.X.listenerCount(eventName);
	}
	eventNames() {
		return this.X.eventNames();
	}
	/** @arg {[event: string, listener: (...args: any[]) => void]} args */
	off(...args) {
		this.X.off(...args);
		return this;
	}
	removeAllListeners() {
		this.X.removeAllListeners();
		return this;
	}
	/** @arg {number} n */
	setMaxListeners(n) {
		this.X.setMaxListeners(n);
		return this;
	}
	getMaxListeners() {
		return this.X.getMaxListeners();
	}
	/** @arg {[event: string, listener: (...args: any[]) => void]} args */
	prependListener(...args) {
		this.X.prependListener(...args);
		return this;
	}
	/** @arg {[event: string, listener: (...args: any[]) => void]} args */
	prependOnceListener(...args) {
		this.X.prependOnceListener(...args);
		return this;
	}
	/** @arg {[event: string|symbol, listener: (...args: any[]) => void]} args */
	removeListener(...args) {
		this.X.removeListener(...args);
		return this;
	}
	/** @arg {[event: string, listener: (...args: any[]) => void]} args */
	addListener(...args) {
		this.X.addListener(...args);
		return this;
	}
	/** @arg {[event: string|symbol, ...args: any[]]} args */
	emit(...args) {
		return this.X.emit(...args);
	}
	/** @arg {[event: string, listener: (...args: any[]) => void]} args */
	on(...args) {
		this.X.on(...args);
		return this;
	}
	/** @arg {[event: string, listener: (...args: any[]) => void]} args */
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
	/** @arg {[data: string|Buffer, key?: import('readline').Key|undefined]} args */
	write(...args) {
		return this.X.write(...args);
	}
	getCursorPos() {
		return this.X.getCursorPos();
	}
	/** @arg {Interface} base_val */
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
	/** @arg {string} value */
	setPrompt(value) {
		if(!this.X) {
			debugger;
			let err=new Error("No internal X");
			console.log(err);
			debugger;
			throw err;
		}
		return this.X.setPrompt(value);
	}
	/** @arg {boolean} [x] */
	prompt(x) {
		this.X.prompt(x);
	}
	/** @arg {[query: string, callback: (answer: string) => void]|[query: string, options: import('stream').EventEmitter.Abortable,callback: (answer: string) => void]} args */
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
		if(vv!==void 0&&this.X!==vv) {
			this.X=vv;
		}
		return this;
	}
}


/**@implements {REPLServer} */
export class REPLServerRuntime extends RLInterface {
	/**@arg {string|repl.ReplOptions} [options] @returns {REPLServerRuntime} */
	static start_repl(options) {
		console.log("start repl");
		let repl_value=repl.start(options);
		console.log("repl_value");
		let repl_value_wrapped=new REPLServerRuntime(repl_value);
		console.log("res");
		return repl_value_wrapped;
	}
	/**@type {REPLServer} */
	X;
	/** @arg {REPLServer} real_value */
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
	/** @arg {string} evalCmd @arg {import("vm").Context} context @arg {string} file @arg {(err: Error|null, result: any) => void} cb */
	eval(evalCmd,context,file,cb) {
		return this.X.eval(evalCmd,context,file,cb);
	}
	get lastError() {return this.X.lastError;}
	get completer() {return this.X.completer;}
	/** @arg {string} keyword @arg {repl.REPLCommand|repl.REPLCommandAction} cmd */
	defineCommand(keyword,cmd) {
		this.X.defineCommand(keyword,cmd);
	}
	/** @arg {boolean} [preserveCursor] */
	displayPrompt(preserveCursor) {
		this.X.displayPrompt(preserveCursor);
	}
	clearBufferedCommand() {
		this.X.clearBufferedCommand();
	}
	/** @type {this['X']['setupHistory']} @arg {string} path @arg {import('./CallbackType.js').CallbackType} callback */
	setupHistory(path,callback) {
		this.X.setupHistory(path,callback);
	}
	historySize=0;
	removeHistoryDuplicates=false;
}
