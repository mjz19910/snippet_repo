import process from "process";
import repl from 'repl';
import vm from 'vm';
import {FetchRequestState} from "preload";
import {REPLServerRuntime} from "./REPLServerRuntime.js";
import {rm_all_properties_from_obj} from "./rm_all_properties_from_obj.js";
import {bind_plugins} from "repl-plugins";
const delete_all_javascript_api = false;
export class repl_activator {
	/**
	 * @param {string} arg0
	 */
	setPrompt(arg0) {
		this.repl.setPrompt(arg0);
	}
	pause() {
		this.repl.pause();
	}
	repl_active = false;
	/**@type {import("repl-support-types").Context|null} */
	m_context = null;
	/**@type {(import("repl-support-types").REPLServer & REPLServerRuntime)|null} */
	m_repl = null;
	/** @arg {FetchRequestState} state */
	constructor(state) {
		this.m_request_state = state;
	}
	displayPrompt() {
		if(this.m_repl){
			this.m_repl.displayPrompt();
		}
	}
	create_repl() {
		let n_repl = repl.start({
			prompt: "",
		});
		/**@type {any} */
		let a_repl = n_repl;
		/**@type {import("repl-support-types").REPLServer & REPLServerRuntime} */
		let r_repl = a_repl;
		this.m_repl = r_repl;
		this.m_repl.pause();
		this.m_repl.setupHistory("./js_log.txt", function(err, _repl) {
			if(err) console.log('error when writing history', err);
		});
		this.m_repl.historySize = 120000;
		this.m_repl.removeHistoryDuplicates = true;
		let context = this.m_repl.context;
		context.rm_all = rm_all_properties_from_obj;
		if(delete_all_javascript_api) {
			vm.runInContext('rm_all(this)', context);
		} else {
			// make node more like browsers
			vm.runInContext('delete this.global', context);
		}
		this.m_context = context;
		this.m_context.get_repl = () => this.m_repl;
	}
	activate() {
		if(this.repl_activating)return;
		if(this.m_request_state.no_repl) return;
		if(!this.m_repl) this.create_repl();
		this.repl_activating = true;
		bind_plugins(this, this.m_request_state);
	}
	/**
	 * @param {string} keyword
	 * @param {import("repl-support-types").REPLCommand} cmd
	 */
	defineCommand(keyword, cmd) {
		this.repl.defineCommand(keyword, cmd);
	}
	get context() {
		if(!this.m_context)
			throw new Error("No repl context");
		return this.m_context;
	}
	get repl() {
		if(!this.m_repl)
			throw new Error("No repl");
		return this.m_repl;
	}
	on_finished() {
		if(!this.m_repl)
			throw new Error("No repl");
		this.m_repl.resume();
		this.m_repl.setPrompt("> ");
		this.m_repl.displayPrompt();
	}
	refresh() {
		this.m_repl?.displayPrompt();
	}
	/**@arg {()=>void} callback */
	do_logging(callback) {
		if(this.m_repl) {
			process.stdout.write("\r");
			callback();
			this.refresh();
		} else {
			callback();
		}
	}
	/**
	 * @param {FetchRequestState} state
	 */
	update(state) {
		this.m_request_state=state;
	}
}
/**@type {repl_activator|null} */
export let g_repl_activator = null;
/**
 * @returns {repl_activator | null}
 * @param {FetchRequestState} state
 */
export function get_repl_activator(state) {
	if(!g_repl_activator){
		g_repl_activator = new repl_activator(state);
	} else {
		g_repl_activator.update(state);
	}
	return g_repl_activator;
}

export function use_types(){
	return [
		FetchRequestState,
	]
}