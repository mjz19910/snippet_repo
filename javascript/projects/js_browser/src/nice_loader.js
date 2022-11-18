import * as path from "path";
import {spawn as child_process_spawn} from "child_process";

const loader_debug=true;

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
	/**@type {string[]}*/
	conditions=[];
	/** @type {{}} */
	importAssertions={};
	parentURL="";
}

let module_map=new Map();

export class IpcLoader {
	depth=0;
	/**@type {(()=>void)[]} */
	exports=[];
	/**@type {unknown[]} */
	errors=[];
	/**@type {[]|[path:string,context:ContextType<any>,nextResolve:import("./nice_loader_types.js").ResolveFn<any>]} */
	args=[];
	/**@type {string[]} */
	arr=[];
	/**@type {string|undefined} */
	plugin_key;
	/**@type {string|undefined} */
	stack;
	/**@type {string|undefined} */
	error_header;
	/**@type {string|undefined} */
	imported_from;
	/**@type {string|undefined} */
	import_target;
	/**@type {string|undefined} */
	import_target_ts;
	split_error_into_lines=false;
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
		this.error_header=this.stack.slice(0, idx_start);
		if(!this.error_header) return;
		if(this.error_header.includes("ENOTDIR")) {
			console.log("Dir error");
			console.log("Error header", this.error_header);
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
			console.log("imported from:"+JSON.stringify([log_path]));
		}
		idx_start=this.arr.indexOf("find");
		if(idx_start>-1) {
			this.import_target=this.arr.slice(idx_start+2,this.arr.indexOf("imported")).join(" ").slice(1,-1);
			console.log("import_target",this.import_target);
		}
		this.import_target_ts=this.import_target?.replace(/(?<=.+)\.js/g,".ts");
	}
}
/** @arg {IpcLoader} state */
function get_typescript_file_to_compile(state) {
	state.dir_start();
	if(!state.import_target_ts) return null;
	return state.import_target_ts;
}

/** @arg {IpcLoader} state */
export async function handle_failed_import(state) {
	let recompile_target=get_typescript_file_to_compile(state);
	if(!recompile_target) {
		module_map.set(state.plugin_key, {});
		return {};
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
}

let ipc_load_data=new IpcLoader;

/**
 * @param {string} specifier
 * @param {ContextType<any>} context
 * @param {import("./nice_loader_types.js").ResolveFn<any>} nextResolve
 */
export async function resolve(specifier,context,nextResolve) {
	let state=ipc_load_data;
	let errors=[];
	if(context.parentURL) {
		let parent_url_parts=context.parentURL.split("/");
		let start_index=parent_url_parts.indexOf("javascript")+1;
		let log_path=parent_url_parts.slice(start_index).join("/");
		console.log('main module load 1:'+JSON.stringify([log_path,specifier]));
		state.plugin_key=`${context.parentURL}:${specifier}`;
	} else {
		console.log('main_module_load 2:'+JSON.stringify(specifier));
		state.plugin_key=specifier;
	}
	if(module_map.has(state.plugin_key)) {
		return module_map.get(state.plugin_key);
	}
	if(specifier.endsWith(".js")) {
		ipc_load_data.args=[specifier,context,nextResolve];
		state.depth++;
		try {
			if(!state.args.length) return null;
			if(state.plugin_key===null) return null;
			let x=state.args;
			/** @type {{}} */
			let mod=await nextResolve(x[0],x[1],x[2]);
			module_map.set(state.plugin_key,mod);
			return mod;
		} catch(err) {
			state.errors.push(err);
			await handle_failed_import(state);
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
		console.log("Failed to import:"+specifier);
		let parent_url_parts=context.parentURL.split("/");
		let start_index=parent_url_parts.indexOf("javascript")+1;
		let log_path=parent_url_parts.slice(start_index).join("/");
		console.log('module fail:'+JSON.stringify([log_path,specifier]));
	} else {
		console.log("specifier:"+specifier);
	}
	if(context.parentURL) {
		console.log(state.plugin_key.slice(state.plugin_key.indexOf("wsl2/workspace")+8));
	} else {
		let parent_url_parts=context.parentURL.split("/");
		let start_index=parent_url_parts.indexOf("javascript");
		console.log([
			parent_url_parts.slice(start_index).join("/"),
			":",
			specifier,
		].join(""));
	}
	return {};
	throw new AggregateError(errors,"All import failures",{});
}
