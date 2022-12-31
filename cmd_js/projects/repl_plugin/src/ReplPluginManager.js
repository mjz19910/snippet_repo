import {basename as path_basename} from "path";
import {env} from "process";
import {runInContext} from 'vm';
import {bind_plugins} from "./plugins/bind_plugins.js";
import {rm_all_properties_from_obj} from "./rm_all_properties_from_obj.js";
import {Extern} from "./use_extern.js";
import {REPLServer, start as repl_start} from 'repl';
import {any} from "./any.js";

const delete_all_javascript_api=false;

let repl_create_count=0;

export class ReplPluginManager {
	clearBufferedCommand() {
		this.get_repl().clearBufferedCommand();
	}
	/**
	 * @arg {string} arg0
	 */
	setPrompt(arg0) {
		let repl=this.get_repl();
		repl.setPrompt(arg0);
	}
	pause() {
		this.get_repl().pause();
	}
	repl_active=false;
	/**@type {import("vm").Context|null} */
	m_context=null;
	/**@type {REPLServer|null} */
	m_repl_runtime=null;
	/** @arg {Extern.PageLoaderState} state */
	constructor(state) {
		this.m_request_state=state;
	}
	displayPrompt() {
		this.get_repl().displayPrompt();
	}
	create_repl_plugin() {
		repl_create_count++;
		console.log('repl_start count',repl_create_count);
		this.m_repl_runtime=repl_start({
			prompt: "",
		});
		let base_repl=this.m_repl_runtime;
		base_repl.pause();
		a: {
			let cur_dir=env.PWD;
			if(!cur_dir) break a;
			let basename=path_basename(cur_dir);
			console.log(basename);
			let xxx=true;
			if(xxx) {
				break a;
			}
			base_repl.setupHistory("./.history/repl_plugin_history",function(err,_repl) {
				if(err) console.log('error when writing history',err);
			});
		}
		any(base_repl).historySize=120000;
		any(base_repl).removeHistoryDuplicates=true;
		let context=base_repl.context;
		context.rm_all=rm_all_properties_from_obj;
		if(delete_all_javascript_api) {
			runInContext('rm_all(this)',context);
		} else {
			// make node more like browsers
			runInContext('delete this.global',context);
		}
		this.m_context=context;
		this.m_context.get_repl=() => this.m_repl_runtime;
	}
	activate() {
		if(this.repl_activating) return;
		if(this.m_request_state.no_repl) return;
		if(!this.m_repl_runtime) this.create_repl_plugin();
		this.repl_activating=true;
		bind_plugins(this);
	}
	/**
	 * @arg {string} keyword
	 * @arg {import("repl").REPLCommand} cmd
	 */
	defineCommand(keyword,cmd) {
		this.get_repl().defineCommand(keyword,cmd);
	}
	get context() {
		if(!this.m_context) {
			this.m_context=this.get_repl().context;
		}
		return this.m_context;
	}
	get_repl() {
		if(!this.m_repl_runtime) {
			this.create_repl_plugin();
		}
		if(!this.m_repl_runtime) throw new Error("repl create failed");
		return this.m_repl_runtime;
	}
	on_finished() {
		this.get_repl().resume();
		this.get_repl().setPrompt("> ");
		this.get_repl().displayPrompt();
	}
	refresh() {
		this.get_repl().displayPrompt();
	}
	/**@arg {()=>void} callback */
	do_logging(callback) {
		if(this.m_repl_runtime) {
			process.stdout.write("\r");
			callback();
			this.refresh();
		} else {
			callback();
		}
	}
	/**
	 * @arg {Extern.PageLoaderState} state
	 */
	update(state) {
		this.m_request_state=state;
	}
}
