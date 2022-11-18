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

/**@type {{value:import("./nice_loader_types.js").ResolveFn|null}} */
const base_import={value: null};

export class IpcLoader {
	depth=0;
	/**@type {(()=>void)[]} */
	exports=[];
	/**@type {([true,Error]|[false,unknown])[]} */
	errors=[];
	/**@type {null|[path:string,context:ContextType<any>,nextResolve:import("./nice_loader_types.js").ResolveFn]} */
	args=null;
	/**@type {string|null} */
	plugin_key=null;
}


export class ReplPluginManagerModule {

}
/**
	 * @arg {IpcLoader} state
	 */
async function import_ipc_plugin(state) {
	state.depth++;
	let mod=null;
	try {
		mod=await try_import_module(state);
	} catch(err) {
		state.errors.push(err);
		await handle_failed_import(state,load_key,context,defaultResolve);
		if(module_map.has(load_key)) {
			return module_map.get(load_key);
		} else {
			throw new Error("Handling error did not load plugin");
		}
	} finally {
		state.depth--;
	}
	return mod;
}

export class HtmlLexerManagerModule {
	/**
	* @arg {IpcLoader} state
	*/
	static async import_ipc_plugin(state) {
		state.depth++;
		let mod=null;
		try {
			mod=await try_import_module(state);
		} catch(e) {
			if(e instanceof Error) {
				state.errors.push(e);
			} else {
				console.log("got non error");
				console.log(e);
				console.error("HERE");
			}
			await handle_failed_import(state);
			if(module_map.has(load_key)) {
				return module_map.get(load_key);
			} else {
				throw new Error("Handling error did not load plugin");
			}
		}
		return mod;
	}
}

/**
 * @param {IpcLoader} state
 */
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

class A {
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

let a=new A;

/** @param {A} b */
function dir_func_2(b) {
	if(!b.stack) throw new Error("no stack");
	b.error_line=b.stack.split("\n")[0];
}

/** @param {A} b */
function dir_func_3(b) {
	if(!b.error_line) throw new Error();
	b.arr=b.error_line.split(" ");
}

/** @param {A} b */
function dir_func_4(b) {
	if(!b.error_line) throw new Error();
	b.imported_from=b.arr.slice(b.arr.indexOf("from")+1).join(" ");
	console.log("imported from",a.imported_from);
}

/** @param {A} b */
function dir_func_5(b) {
	if(!b.error_line) throw new Error();
	let idx_start=b.arr.indexOf("find")+2;
	b.import_target=b.arr.slice(idx_start,b.arr.indexOf("imported")).join(" ").slice(1,-1);
	console.log("import_target",b.import_target);
}

/**@arg {A} b */
function dir_func_6(b) {
	if(!b.import_target) throw new Error("missing import_target");
	b.import_target_ts=b.import_target.replace(/(?<=.+)\.js/g,".ts");
}

/** @arg {IpcLoader} state */
export async function handle_failed_import(state) {
	let last_error=state.errors.at(-1);
	if(!(last_error instanceof Error)) throw new Error("Bad error");
	if(!last_error.stack) throw new Error("No Error stack");
	a.stack=last_error.stack;
	dir_func_2(a);
	if(!a.error_line) throw new Error("no imp_mod");
	dir_func_3(a);
	dir_func_4(a);
	dir_func_5(a);
	dir_func_6(a);
	if(!a.import_target_ts) throw new Error();
	debugger;
	let target_re_compile=a.import_target_ts.replace("file:","");
	let result=await new Promise(function(resolve,reject) {
		let cp=child_process_spawn("tsc",['-t','ESNext',"--outDir","./build/",target_re_compile],{});
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

/** @arg {IpcLoader} state */
export async function import_ipc_plugin(state) {
	if(loader_debug) console.log('imp depth',state.depth);
	state.depth++;
	try {
		let mod=await try_import_module(state);
		return mod;
	} catch(err) {
		state.errors.push([false,err]);
		await handle_failed_import(state);
		if(module_map.has(plugin_key)) {
			return module_map.get(plugin_key);
		} else {
			throw new Error("Handling error did not load plugin");
		}
	} finally {
		state.depth--;
	}
}

let ipc_load_data=new IpcLoader;

/**
 * @param {string} specifier
 * @param {ContextType} context
 * @param {import("./nice_loader_types.js").ResolveFn} defaultResolve
 */
export async function resolve(specifier,context,defaultResolve) {
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
			let res=await import_ipc_plugin(ipc_load_data,specifier,context,defaultResolve);
			if(res!==null) {
				return res;
			}
		} catch(err) {
			errors.push(err);
		}
		try {
			return await defaultResolve(specifier,context,defaultResolve);
		} catch(err) {
			errors.push(err);
		}
	}
	try {
		return await defaultResolve(specifier+".js",context,defaultResolve);
	} catch(err) {
		errors.push(err);
	}
	if(loader_debug) console.log('Failed to load import specifier: "'+specifier+'"');
	try {
		return await defaultResolve(specifier,context,defaultResolve);
	} catch(err) {
		if(loader_debug) console.log('Failed to load import specifier: "'+specifier+'"');
		errors.push(err);
	}
	if(system_modules.includes(specifier)) {
		return defaultResolve(specifier,context,defaultResolve);
	}
	console.log("tried all imports");
	console.log(specifier);
	console.log(context.parentURL);
	throw new AggregateError(errors,"All import failures",{});
}
