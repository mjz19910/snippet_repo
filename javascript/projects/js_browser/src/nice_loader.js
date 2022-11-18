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
	/**@type {null|[path:string,context:ContextType<any>,nextResolve:import("./nice_loader_types.js").ResolveFn<any>]} */
	args=null;
	/**@type {string|null} */
	plugin_key=null;
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
