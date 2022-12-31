import * as path from "path";
import {spawn as child_process_spawn} from "child_process";
import {env} from "process";

const system_modules=[
	'repl',
	'http',
	'https',
	'path',
	'process',
	'vm',
];

/** @template T @type {T} */
class ContextType {
	/** @type {string[]}*/
	conditions=[];
	/** @type {{}} */
	importAssertions={};
	parentURL="";
}

let module_map=new Map();

export class IpcLoader {
	depth=0;
	/** @type {(()=>void)[]} */
	exports=[];
	/** @type {unknown[]} */
	errors=[];
	/** @type {[]|[path:string,context:ContextType<any>,nextResolve:import("./nice_loader_types.js").ResolveFn<any>]} */
	args=[];
	/** @type {string[]} */
	arr=[];
	/** @type {string|undefined} */
	plugin_key;
	/** @type {string|undefined} */
	stack;
	/** @type {string|undefined} */
	error_header;
	/** @type {string|undefined} */
	imported_from;
	/** @type {string|undefined} */
	import_target;
	/** @type {string|undefined} */
	import_target_ts;
	split_error_into_lines=false;
	no_logging=true;
	dir_start() {
		if(this.args.length===0) return;
		this.last_error=this.errors.at(-1);
		if(this.last_error instanceof Error) {
			this.stack=this.last_error.stack;
		}
		if(!this.stack) return;
		let idx_start=this.stack.indexOf("\n");
		if(this.split_error_into_lines) {
			this.error_lines=this.stack.split("\n");
		}
		this.error_header=this.stack.slice(0,idx_start);
		if(!this.error_header) return;
		if(this.error_header.includes("ENOTDIR")) {
			if(!this.no_logging) console.log("Dir error");
			if(!this.no_logging) console.log("Error header",this.error_header);
			this.error_code="ENOTDIR";
		}
		this.arr=this.error_header.split(" ")||[];
		idx_start=this.arr.indexOf("from");
		if(idx_start>-1) {
			this.imported_from=this.arr.slice(idx_start+1).join(" ");
		}
		if(this.imported_from) {
			let parent_url_parts=this.imported_from.split("/");
			let start_index=parent_url_parts.indexOf("snippet_repo")+3;
			let log_path=parent_url_parts.slice(start_index).join("/");
			if(!this.no_logging) console.log("imported_from_value: "+JSON.stringify([log_path]));
		}
		idx_start=this.arr.indexOf("find");
		if(idx_start>-1) {
			this.import_target=this.arr.slice(idx_start+2,this.arr.indexOf("imported")).join(" ").slice(1,-1);
			if(!this.no_logging) console.log("import_target_value: "+JSON.stringify([this.import_target]));
		}
		this.import_target_ts=this.import_target?.replace(/(?<=.+)\.js/g,".ts");
	}
	async do_import() {
		let import_debug=false;
		let state=this;
		if(state.args.length===0) return;
		let [specifier,context,nextResolve]=state.args;
		let errors=[];
		let prev_log_dir="file://"+env.PWD||"";
		/** @type {string[]} */
		let parent_url_parts=[];
		let start_index;
		let log_path;
		let log_dir=prev_log_dir;
		/** @arg {string} source_url */
		function get_parent_url_parts(source_url) {
			parent_url_parts=source_url.split("/");
			start_index=parent_url_parts.indexOf("javascript")+2;
			log_path=parent_url_parts.slice(start_index).join("/");
			log_dir=path.dirname(log_path);
		}
		if(!context.parentURL) {
			get_parent_url_parts(specifier);
			if(import_debug) console.log('main_module_load 2:'+JSON.stringify([log_path]));
			return nextResolve(specifier,context,nextResolve);
		}
		if(specifier.startsWith("file:")) {
			return nextResolve(specifier,context,nextResolve);
		}
		if(context.parentURL) {
			get_parent_url_parts(context.parentURL);
			let a=[log_path,"->",path.join(log_dir,specifier)];
			let json_str=JSON.stringify(a).replace(',"->",'," -> ");
			if(import_debug) console.log('main_module_load 3:'+json_str);
			state.plugin_key=`${context.parentURL}:${specifier}`;
		} else {
			get_parent_url_parts(specifier);
			console.log('main_module_load 2:'+JSON.stringify([log_path]));
			state.plugin_key=specifier;
		}
		if(module_map.has(state.plugin_key)) {
			return module_map.get(state.plugin_key);
		}
		if(specifier.endsWith(".js")) {
			let fast_resolve=true;
			if(fast_resolve)
				return await nextResolve(specifier,context,nextResolve);
			try {
				state.depth++;
				if(!state.args.length) return null;
				if(state.plugin_key===null) return null;
				/** @type {{}} */
				let mod=await nextResolve(specifier,context,nextResolve);
				module_map.set(state.plugin_key,mod);
				return mod;
			} catch(err) {
				state.errors.push(err);
				let recompile_target=get_typescript_file_to_compile(state);
				if(!recompile_target) {
					debugger;
					recompile_target=get_typescript_file_to_compile(state);
					throw state.errors[0];
				}
				let target_re_compile=recompile_target.replace("file:","");
				let result=await new Promise(function(resolve,reject) {
					let cp=child_process_spawn("tsc",['-t','ESNext',"-m","ESNext","--outDir","./build/",target_re_compile],{});
					cp.stdout.on("data",e => {
						process.stdout.write(e);
					});
					cp.stderr.on("data",e => {
						process.stderr.write(e);
					});
					cp.on("error",err => {
						reject(err);
					});
					cp.on("exit",(code) => {
						console.log('tsc exit',code);
						resolve(code);
					});
				});
				if(result!==0) new Error("Failed to recompile");
			} finally {state.depth--;}
			if(module_map.has(state.plugin_key)) return module_map.get(state.plugin_key);
		}
		try {
			return await nextResolve(specifier,context,nextResolve);
		} catch(err) {
			errors.push(err);
		}
		if(system_modules.includes(specifier)) {
			return nextResolve(specifier,context,nextResolve);
		}
		if(context.parentURL) {
			get_parent_url_parts(context.parentURL);
			console.log('module fail:'+JSON.stringify([log_path,specifier]));
		} else {
			console.log("specifier:"+specifier);
		}
		if(!context.parentURL) {
			parent_url_parts=context.parentURL.split("/");
			start_index=parent_url_parts.indexOf("javascript");
			console.log([
				parent_url_parts.slice(start_index).join("/"),
				":",
				specifier,
			].join(""));
		}
		if(errors.length===1) {
			throw errors[0];
		}
		throw new AggregateError(errors,"All import failures",{});
	}
}
/** @arg {IpcLoader} state */
function get_typescript_file_to_compile(state) {
	state.dir_start();
	if(!state.import_target_ts) return null;
	return state.import_target_ts;
}

let ipc_load_data=new IpcLoader;

/** @arg {string} specifier @arg {ContextType<any>} context @arg {import("./nice_loader_types.js").ResolveFn<any>} nextResolve */
export async function resolve(specifier,context,nextResolve) {
	ipc_load_data.args=[specifier,context,nextResolve];
	return await ipc_load_data.do_import();
}
