import {spawnSync} from "child_process";
import process from "process";
import repl,{REPLServer} from 'repl';
import vm from 'vm';
import {bind_plugins} from "./plugins/mod.js";
import {ReplLocalState} from "./ReplLocalState";
import {REPLServerRuntime} from "./REPLServerRuntime.js";
import {rm_all_properties_from_obj} from "./rm_all_properties_from_obj.js";

const delete_all_javascript_api=false;

export class ReplPluginReplSupport {
	/**
	 * @param {string} arg0
	 */
	setPrompt(arg0) {
		this.get_repl().setPrompt(arg0);
	}
	pause() {
		this.get_repl().pause();
	}
	repl_active=false;
	/**@type {import("vm").Context|null} */
	m_context=null;
	/**@type {(REPLServer & REPLServerRuntime)|null} */
	m_base_repl_opt=null;
	/** @arg {ReplLocalState} state */
	constructor(state) {
		this.m_request_state=state;
	}
	displayPrompt() {
		this.get_repl().displayPrompt();
	}
	create_repl() {
		let n_repl=repl.start({
			prompt: "",
		});
		/**@type {any} */
		let a_repl=n_repl;
		/**@type {REPLServer & REPLServerRuntime} */
		let r_repl=a_repl;
		this.m_base_repl_opt=r_repl;
		this.m_base_repl_opt.pause();
		let system_val=spawnSync("bash",["-c","echo ${HISTFILE%/zsh_history}"]);
		console.log(system_val.output);
		this.m_base_repl_opt.setupHistory("./.history/repl_plugin_history",function(err,_repl) {
			if(err) console.log('error when writing history',err);
		});
		this.m_base_repl_opt.historySize=120000;
		this.m_base_repl_opt.removeHistoryDuplicates=true;
		let context=this.m_base_repl_opt.context;
		context.rm_all=rm_all_properties_from_obj;
		if(delete_all_javascript_api) {
			vm.runInContext('rm_all(this)',context);
		} else {
			// make node more like browsers
			vm.runInContext('delete this.global',context);
		}
		this.m_context=context;
		this.m_context.get_repl=() => this.m_base_repl_opt;
	}
	activate() {
		if(this.repl_activating) return;
		if(this.m_request_state.no_repl) return;
		if(!this.m_base_repl_opt) this.create_repl();
		this.repl_activating=true;
		bind_plugins(this,this.m_request_state);
	}
	/**
	 * @param {string} keyword
	 * @param {import("repl").REPLCommand} cmd
	 */
	defineCommand(keyword,cmd) {
		this.get_repl.defineCommand(keyword,cmd);
	}
	get context() {
		if(!this.m_context)
			throw new Error("No repl context");
		return this.m_context;
	}
	get_repl() {
		if(!this.m_base_repl_opt)
			throw new Error("No repl");
		return this.m_base_repl_opt;
	}
	on_finished() {
		if(!this.m_base_repl_opt)
			throw new Error("No repl");
		this.m_base_repl_opt.resume();
		this.m_base_repl_opt.setPrompt("> ");
		this.m_base_repl_opt.displayPrompt();
	}
	refresh() {
		this.m_base_repl_opt?.displayPrompt();
	}
	/**@arg {()=>void} callback */
	do_logging(callback) {
		if(this.m_base_repl_opt) {
			process.stdout.write("\r");
			callback();
			this.refresh();
		} else {
			callback();
		}
	}
	/**
	 * @param {ReplLocalState} state
	 */
	update(state) {
		this.m_request_state=state;
	}
}
/**@type {ReplPluginReplSupport|null} */
export let g_repl_activator=null;
/**
 * @returns {ReplPluginReplSupport | null}
 * @param {ReplLocalState} state
 */
export function get_repl_activator(state) {
	if(!g_repl_activator) {
		g_repl_activator=new ReplPluginReplSupport(state);
	} else {
		g_repl_activator.update(state);
	}
	return g_repl_activator;
}

export function use_types() {
	return [
		ReplLocalState,
	];
}