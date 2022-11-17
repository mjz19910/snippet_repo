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

export class IpcLoader {
	depth=0;
	/**@type {(()=>void)[]} */
	exports=[];
}


import * as path from "path";
import {spawn as child_process_spawn} from "child_process";

/**
 * @param {string} plugin_key
 * @param {string} module_path
 */
export async function try_import_module(plugin_key,module_path) {
	/** @type {{}} */
	let mod=await import(module_path);
	module_map.set(plugin_key,mod);
	return mod;
}

/**
 * @param {unknown} error
 * @param {string} import_string
 * @arg {IpcLoader} state
 */
export async function handle_failed_import(state,error,import_string) {
	let mod=null;
	let errors=[];
	while(mod===null) {
		if(state.depth>8) {
			throw new Error("ipc plugin loader overflow (import depth too high)");
		}
		if(!(error instanceof Error))
			throw new Error("Bad error");
		if(!error.stack) throw new Error("No Error stack");
		let stk=error.stack;
		let imp_mod=stk.split("\n")[0];
		console.log(stk);
		let line_part_1=stk.split("\n")[1];
		console.log(line_part_1);
		debugger;
		console.log(line_part_1.split("from"));
		let imp_line=line_part_1.split("from")[1].trim().replaceAll(";","");
		console.log(imp_mod,imp_line);
		if(!imp_line) throw new Error("Error does not come from failed import");
		if(!imp_mod) throw new Error("Module line not found");
		let imp_real=JSON.parse(imp_line).replace(/(?<=.+)\.js/g,".ts");
		let mod_dir=path.dirname(imp_mod);
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
				case 'repl_plugin_manager/mod.js': return import_ipc_plugin(state,import_string);
				case 'html_lexer': return import_ipc_plugin(state,import_string);
				default: throw new Error("Unable to load "+import_string[0]);
			}
		} catch(err) {
			errors.push(err);
		}
		throw new AggregateError([error,...errors]);
	}
}

/** @arg {IpcLoader} state @arg {string} plugin_key @arg {any} context */
export async function import_ipc_plugin(state,plugin_key, context) {
	switch(plugin_key) {
		case 'repl_plugin_manager/mod.js': {
			/**@type {`../../${typeof plugin_key}`}*/
			const module_page_loader_str=`../../${plugin_key}`;
			return ReplPluginManagerModule.import_ipc_plugin(state,plugin_key,module_page_loader_str);
		}
		case 'html_lexer': {
			return ReplPluginManagerModule.import_ipc_plugin(state,plugin_key,module_page_loader_str);
		} break;
		case './src/HTMLTokenizer.js': break;
		default: throw new Error("No types for "+plugin_key);
	}
	if(module_map.has(plugin_key)) {
		return module_map.get(plugin_key);
	}
	if(loader_debug) console.log('imp depth',state.depth);
	state.depth++;
	try {
		let mod=await try_import_module(plugin_key,`${plugin_key}`);
		return mod;
	} catch(error) {
		await handle_failed_import(state,error,plugin_key);
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
	if(loader_debug) console.log('ctx',context);
	if(specifier.endsWith(".js")) {
		try {
			return await import_ipc_plugin(ipc_load_data,specifier,context);
		} catch (err) {
			errors.push(err);
		}
		try {
			return await defaultResolve(specifier,context,defaultResolve);
		} catch(err) {
			if(loader_debug) console.log('Failed to load import specifier: ',specifier);
			errors.push(err);
		}
	}
	if(system_modules.includes(specifier)) {
		return defaultResolve(specifier,context,defaultResolve);
	}
	try {
		return await defaultResolve(specifier+".js",context,defaultResolve);
	} catch (e) {
		errors.push(e);
	}
	if(loader_debug) console.log('Failed to load import specifier: ',specifier);
	try {
		return await defaultResolve(specifier,context,defaultResolve);
	} catch(err) {
		if(loader_debug) console.log('Failed to load import specifier: ',specifier);
		errors.push(err);
	}
	throw new AggregateError(errors, "All import failures", {});
}
