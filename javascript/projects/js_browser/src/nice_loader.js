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

/**@type {{value:import("./nice_loader_types.js").ResolveFn|null}} */
const base_import={value: null};

export class IpcLoader {
	depth=0;
	/**@type {(()=>void)[]} */
	exports=[];
}


import * as path from "path";
import {spawn as child_process_spawn} from "child_process";

export class ReplPluginManagerModule {
	/**
	 * @arg {IpcLoader} state
	 * @arg {"repl_plugin_manager/mod.js"} load_key
	 * @arg {"../../repl_plugin_manager/mod.js"} path
	 * @param {{ conditions: string[]; importAssertions: {}; parentURL: string; }} context
	 * @param {import("./nice_loader_types.js").ResolveFn} defaultResolve
	 */
	static async import_ipc_plugin(state,load_key,path,context,defaultResolve) {
		state.depth++;
		let mod=null;
		try {
			mod=await try_import_module(load_key,path,context,defaultResolve);
		} catch(err) {
			await handle_failed_import(state,err,load_key,context,defaultResolve);
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
}

export class HtmlLexerManagerModule {
	/**
	* @arg {IpcLoader} state
	* @arg {"html_lexer"} load_key
	* @arg {"../../html_lexer"} path
	* @param {{ conditions: string[]; importAssertions: {}; parentURL: string; }} context
	* @param {import("./nice_loader_types.js").ResolveFn} defaultResolve
	*/
	static async import_ipc_plugin(state,load_key,path,context,defaultResolve) {
		state.depth++;
		let mod=null;
		try {
			mod=await try_import_module(load_key,path,context,defaultResolve);
		} catch(e) {
			await handle_failed_import(state,e,load_key,context,defaultResolve);
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
}

/**
 * @param {string} plugin_key
 * @param {string} module_path
 * @arg {import("./nice_loader_types.js").ResolveFn} arg2
 * @param {{ conditions: string[]; importAssertions: {}; parentURL: string; }} arg1
 */
export async function try_import_module(plugin_key,module_path,arg1,arg2) {
	if(base_import.value===null) return null;
	/** @type {{}} */
	let mod=await base_import.value(module_path,arg1,arg2);
	module_map.set(plugin_key,mod);
	return mod;
}

/**
 * @param {unknown} error
 * @param {string} import_string
 * @arg {IpcLoader} state
 * @param {{ conditions: string[]; importAssertions: {}; parentURL: string; }} context
 * @param {import("./nice_loader_types.js").ResolveFn} defaultResolve
 */
export async function handle_failed_import(state,error,import_string,context,defaultResolve) {
	let mod=null;
	let errors=[];
	while(mod===null) {
		if(state.depth>1) {
			throw new Error("Import depth too high");
		}
		if(!(error instanceof Error)) throw new Error("Bad error");
		if(!error.stack) throw new Error("No Error stack");
		let stk=error.stack;
		let imp_mod=stk.split("\n")[0];
		let idx_start_1=imp_mod.indexOf("from");
		let idx_start_2=imp_mod.indexOf("find");
		console.log("load 1",imp_mod.slice(idx_start_2,idx_start_1));
		console.log("load 2",imp_mod.slice(idx_start_1+4));
		let imp_mod_name=imp_mod.split("from")[1].trim().replaceAll(";","");
		console.log("load 3",imp_mod_name);
		let imp_real=imp_mod_name.replace(/(?<=.+)\.js/g,".ts");
		let mod_dir=path.dirname(imp_mod_name);
		debugger;
		let target_re_compile=path.join(mod_dir,imp_real).replace("file:","");
		let result=await new Promise(function(resolve,reject) {
			let cp=child_process_spawn("tsc",['-t','ESNext',target_re_compile],{});
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
		try {
			switch(import_string[0]) {
				case 'repl_plugin_manager/mod.js': return import_ipc_plugin(state,import_string,context,defaultResolve);
				case 'html_lexer': return import_ipc_plugin(state,import_string,context,defaultResolve);
				default: throw new Error("Unable to load "+import_string[0]);
			}
		} catch(err) {
			errors.push(err);
		}
		throw new AggregateError([error,...errors]);
	}
}

/** @arg {IpcLoader} state @arg {string} plugin_key @arg {any} context @arg {import("./nice_loader_types.js").ResolveFn} defaultResolve */
export async function import_ipc_plugin(state,plugin_key,context,defaultResolve) {
	base_import.value=defaultResolve;
	switch(plugin_key) {
		case 'repl_plugin_manager/mod.js': {
			/**@type {`../../${typeof plugin_key}`}*/
			const module_page_loader_str=`../../${plugin_key}`;
			return ReplPluginManagerModule.import_ipc_plugin(state,plugin_key,module_page_loader_str,context,defaultResolve);
		}
		case 'html_lexer': {
			/**@type {`../../${typeof plugin_key}`}*/
			const module_page_loader_str=`../../${plugin_key}`;
			return HtmlLexerManagerModule.import_ipc_plugin(state,plugin_key,module_page_loader_str,context,defaultResolve);
		}
		case './src/HTMLTokenizer.js': break;
		default: return null;
	}
	if(module_map.has(plugin_key)) {
		return module_map.get(plugin_key);
	}
	if(loader_debug) console.log('imp depth',state.depth);
	if(state.depth>1) {
		throw new Error("Too deep");
	}
	state.depth++;
	try {
		let mod=await try_import_module(plugin_key,`${plugin_key}`,context,defaultResolve);
		return mod;
	} catch(error) {
		await handle_failed_import(state,error,plugin_key,context,defaultResolve);
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
	if(loader_debug) console.log('spec',specifier);
	if(loader_debug) console.log('parent module',context.parentURL);
	if(specifier.endsWith(".js")) {
		try {
			let res=await import_ipc_plugin(ipc_load_data,specifier,context,defaultResolve);
			if(res!==null) {
				return res;
			}
		} catch(err) {
			console.log(err);
		}
		try {
			return await defaultResolve(specifier,context,defaultResolve);
		} catch(err) {
			if(loader_debug) console.log('Failed to load import specifier: ',specifier);
			throw err;
		}
	}
	if(system_modules.includes(specifier)) {
		return defaultResolve(specifier,context,defaultResolve);
	}
	try {
		return await defaultResolve(specifier+".js",context,defaultResolve);
	} catch(err) {
		errors.push(err);
	}
	if(loader_debug) console.log('Failed to load import specifier: ',specifier);
	try {
		return await defaultResolve(specifier,context,defaultResolve);
	} catch(err) {
		if(loader_debug) console.log('Failed to load import specifier: ',specifier);
		errors.push(err);
	}
	throw new AggregateError(errors,"All import failures",{});
}
