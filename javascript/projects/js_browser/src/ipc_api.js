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

class ContextType {
	/**@type {string[]}*/
	conditions=[];
	importAssertions={};
	parentURL="";
}

let module_map=new Map();

/**@type {{value:import("./nice_loader_types.js").ResolveFn<any>|null}} */
const base_import={value: null};

export class IpcLoader {
	depth=0;
	/**@type {(()=>void)[]} */
	exports=[];
	/**@type {unknown[]} */
	errors=[];
	/**@type {null|[path:string,context:ContextType,nextResolve:import("./nice_loader_types.js").ResolveFn<any>]} */
	args=null;
	/**@type {string|null} */
	plugin_key=null;
}


export class ReplPluginManagerModule {

}
/** @arg {IpcLoader} state */
export async function import_ipc_plugin(state) {
	state.depth++;
	try {
		if(base_import.value===null) return null;
		if(state.args===null) return null;
		if(state.plugin_key===null) return null;
		let x=state.args;
		/** @type {{}} */
		let mod=await base_import.value(x[0],x[1],x[2]);
		module_map.set(state.plugin_key,mod);
		return mod;
	} catch(err) {
		state.errors.push(err);
		await handle_failed_import(state);
	} finally {state.depth--;}
	if(!module_map.has(state.plugin_key)) throw new Error("Handling error did not load plugin");
	return module_map.get(state.plugin_key);
}

/** @param {IpcLoader} state */
export async function try_import_module(state) {
	if(base_import.value===null) return null;
	if(state.args===null) return null;
	if(state.plugin_key===null) return null;
	let x=state.args;
	/** @type {{}} */
	let mod=await base_import.value(x[0],x[1],x[2]);
	module_map.set(state.plugin_key,mod);
	return mod;
}

class ImportData {
	/**@type {string|null} */
	stack=null;
	/**@type {string|null} */
	error_line=null;
	/**@type {string|null} */
	imported_from=null;
	/**@type {string|null} */
	import_target=null;
	/**@type {string|null} */
	import_target_ts=null;
	/**@type {string[]} */
	arr=[];
}

let a=new ImportData;

/** @param {ImportData} b */
function dir_func_2(b) {
	if(!b.stack) throw new Error("no stack");
	b.error_line=b.stack.split("\n")[0];
	if(!a.error_line) throw new Error("no error_line");
}

/** @param {ImportData} b */
function dir_func_3(b) {
	if(!b.error_line) throw new Error();
	b.arr=b.error_line.split(" ");
}

/** @param {ImportData} b */
function dir_func_4(b) {
	if(!b.error_line) throw new Error();
	b.imported_from=b.arr.slice(b.arr.indexOf("from")+1).join(" ");
	if(!b.imported_from) throw new Error("no error_line");
	console.log("imported from",b.imported_from);
}

/** @param {ImportData} b */
function dir_func_5(b) {
	if(!b.error_line) throw new Error();
	let idx_start=b.arr.indexOf("find")+2;
	b.import_target=b.arr.slice(idx_start,b.arr.indexOf("imported")).join(" ").slice(1,-1);
	console.log("import_target",b.import_target);
}

/**@arg {ImportData} b */
function dir_func_6(b) {
	if(!b.import_target) throw new Error("missing import_target");
	b.import_target_ts=b.import_target.replace(/(?<=.+)\.js/g,".ts");
}

/** @arg {IpcLoader} b */
function get_last_error_stack(b) {
	let last_error=b.errors.at(-1);
	if(!(last_error instanceof Error)) throw new Error("Bad error");
	if(!last_error.stack) throw new Error("No Error stack");
	return last_error.stack;
}

/** @param {IpcLoader} state */
function get_typescript_file_to_compile(state) {
	a.stack=get_last_error_stack(state);
	dir_func_2(a);
	dir_func_3(a);
	dir_func_4(a);
	dir_func_5(a);
	dir_func_6(a);
	if(!a.import_target_ts) throw new Error();
	return a.import_target_ts;
}

/** @arg {IpcLoader} state */
export async function handle_failed_import(state) {
	let target_re_compile=get_typescript_file_to_compile(state).replace("file:","");
	let result=await new Promise(function(resolve,reject) {
		let cp=child_process_spawn("tsc",['-t','ESNext', "-m", "ESNext","--outDir","./build/",target_re_compile],{});
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
 * @param {ContextType} context
 * @param {import("./nice_loader_types.js").ResolveFn<any>} nextResolve
 */
export async function resolve(specifier,context,nextResolve) {
	let errors=[];
	let plugin_key;
	debugger;
	if(context.parentURL) {
		if(loader_debug) {
			console.log('spec: '+specifier+" -> "+path.resolve(specifier));
			console.log('parent module',context.parentURL);
		}
		plugin_key=`${context.parentURL}:${specifier}`;
	} else {
		plugin_key=specifier;
	}
	if(loader_debug) {
		console.log("resolve plugin_key");
		console.log(plugin_key);
	}
	if(module_map.has(plugin_key)) {
		return module_map.get(plugin_key);
	}
	if(specifier.endsWith(".js")) {
		try {
			let state=new IpcLoader;
			//specifier,context,nextResolve
			let res=await import_ipc_plugin(state);
			if(res!==null) {
				return res;
			}
		} catch(err) {
			errors.push(err);
		}
		try {
			return await nextResolve(specifier,context,nextResolve);
		} catch(err) {
			errors.push(err);
		}
	}
	try {
		return await nextResolve(specifier+".js",context,nextResolve);
	} catch(err) {
		errors.push(err);
	}
	if(loader_debug) console.log('Failed to load import specifier: "'+specifier+'"');
	try {
		return await nextResolve(specifier,context,nextResolve);
	} catch(err) {
		if(loader_debug) console.log('Failed to load import specifier: "'+specifier+'"');
		errors.push(err);
	}
	if(system_modules.includes(specifier)) {
		return nextResolve(specifier,context,nextResolve);
	}
	console.log("tried all imports");
	console.log(specifier);
	console.log(context.parentURL);
	throw new AggregateError(errors,"All import failures",{});
}
