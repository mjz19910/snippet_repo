import {spawnSync} from "child_process";
import path from "path";
import process, {env} from "process";
import vm from 'vm';
import {PageLoaderState} from "../../page_loader/index.js";
import {bind_plugins} from "./plugins/bind_plugins.js";
import {REPLServerRuntime} from "./REPLServerRuntime.js";
import {rm_all_properties_from_obj} from "./rm_all_properties_from_obj.js";

const delete_all_javascript_api=false;

let repl_create_count=0;

export class ReplPluginManager {
	/**
	 * @param {string} arg0
	 */
	setPrompt(arg0) {
		let repl_internal=this.get_repl_runtime();
		if(repl_internal.X===void 0) {
			console.log("unable use repl_internal as X is missing");
		}
		repl_internal.setPrompt(arg0);
	}
	pause() {
		this.get_repl_runtime().pause();
	}
	repl_active=false;
	/**@type {import("vm").Context|null} */
	m_context=null;
	/**@type {REPLServerRuntime|null} */
	m_repl_runtime=null;
	/** @arg {PageLoaderState} state */
	constructor(state) {
		this.m_request_state=state;
	}
	displayPrompt() {
		this.get_repl_runtime().displayPrompt();
	}
	get internalX() {
		if(!this.m_repl_runtime) throw new Error("");
		return this.m_repl_runtime.X;
	}
	create_repl_plugin() {
		repl_create_count++;
		console.log('repl_start count', repl_create_count);
		this.m_repl_runtime=REPLServerRuntime.start_repl({
			prompt: "",
		});
		let base_repl=this.m_repl_runtime;
		base_repl.pause();
		a: {
			let cur_dir=env.PWD;
			if(!cur_dir) break a;
			let basename=path.basename(cur_dir);
			console.log(basename);
			let xxx=true;
			if(xxx) {
				break a;
			}
			base_repl.setupHistory("./.history/repl_plugin_history",function(err,_repl) {
				if(err) console.log('error when writing history',err);
			});
		}
		base_repl.historySize=120000;
		base_repl.removeHistoryDuplicates=true;
		let context=base_repl.context;
		context.rm_all=rm_all_properties_from_obj;
		if(delete_all_javascript_api) {
			vm.runInContext('rm_all(this)',context);
		} else {
			// make node more like browsers
			vm.runInContext('delete this.global',context);
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
	 * @param {string} keyword
	 * @param {import("repl").REPLCommand} cmd
	 */
	defineCommand(keyword,cmd) {
		this.get_repl_runtime().defineCommand(keyword,cmd);
	}
	get context() {
		if(!this.m_context) {
			this.m_context=this.get_repl_runtime().context;
		}
		return this.m_context;
	}
	get_repl_runtime() {
		if(!this.m_repl_runtime) {
			this.create_repl_plugin();
		}
		if(!this.m_repl_runtime) throw new Error("repl create failed");
		return this.m_repl_runtime;
	}
	on_finished() {
		this.get_repl_runtime().resume();
		this.get_repl_runtime().setPrompt("> ");
		this.get_repl_runtime().displayPrompt();
	}
	refresh() {
		this.get_repl_runtime().displayPrompt();
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
	 * @param {PageLoaderState} state
	 */
	update(state) {
		this.m_request_state=state;
	}
}
