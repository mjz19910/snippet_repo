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

/** @template T */
class ContextType {
	/**@type {string[]}*/
	conditions=[];
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
	error_line;
	/**@type {string|undefined} */
	imported_from;
	/**@type {string|undefined} */
	import_target;
	/**@type {string|undefined} */
	import_target_ts;
	dir_start() {
		this.last_error=this.errors.at(-1);
	}
	dir_func_1() {
		if(this.last_error instanceof Error) {
			this.stack=this.last_error.stack||null;
		}
	}
	dir_func_2() {
		this.error_line=this.stack?.split("\n")[0]||null;
	}
	dir_func_3() {
		this.arr=this.error_line?.split(" ")||[];
	}
	dir_func_4() {
		this.imported_from=this.arr.slice(this.arr.indexOf("from")+1).join(" ");
		console.log("imported from",this.imported_from);
	}
	dir_func_5() {
		let idx_start=this.arr.indexOf("find");
		if(idx_start>-1) {
			this.import_target=this.arr.slice(idx_start+2,this.arr.indexOf("imported")).join(" ").slice(1,-1);
			console.log("import_target",this.import_target);
		}
	}
	dir_func_6() {
		this.import_target_ts=this.import_target?.replace(/(?<=.+)\.js/g,".ts")||null;
	}
}

function get_typescript_file_to_compile(state) {
	let a=state;
	let b=a;
	a.dir_func_1(state);
	a.dir_func_2(a);
	a.dir_func_3(a);
	a.dir_func_4(a);
	a.dir_func_5(a);
	a.dir_func_6(a);
	if(!a.import_target_ts) throw new Error();
	return a.import_target_ts;
}

/** @arg {IpcLoader} state */
export async function handle_failed_import(state) {
	let target_re_compile=get_typescript_file_to_compile().replace("file:","");
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
	let errors=[];
	let plugin_key;
	debugger;
	if(context.parentURL) {
		plugin_key=`${context.parentURL}:${specifier}`;
	} else {
		plugin_key=specifier;
		if(loader_debug) {
			console.log('main module load:'+JSON.stringify(specifier));
		}
	}
	if(module_map.has(plugin_key)) {
		return module_map.get(plugin_key);
	}
	if(specifier.endsWith(".js")) {
		let state=ipc_load_data;
		ipc_load_data.args=[specifier,context,nextResolve];
		state.depth++;
		try {
			if(base_import.value===null) return null;
			if(state.args===null) return null;
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
	console.log("tried all imports");
	console.log(specifier);
	console.log(context.parentURL);
	console.log("resolve plugin_key");
	console.log(plugin_key.slice(plugin_key.indexOf("wsl2/workspace")+8));
	throw new AggregateError(errors,"All import failures",{});
}
