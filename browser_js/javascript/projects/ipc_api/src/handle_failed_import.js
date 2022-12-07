import {spawn} from "child_process";
import * as path from "path";
import {import_ipc_plugin} from "./import_ipc_plugin.js";
import {IpcLoader} from "./ipc_loader_state.js";

/**
 * @param {unknown} error
 * @param {string} import_string
 * @arg {IpcLoader} state
 */
export async function handle_failed_import(state,error,import_string) {
	let errors=[];
	if(state.depth>8) {
		throw new Error("ipc plugin loader overflow (import depth too high)");
	}
	if(!(error instanceof Error))
		throw new Error("Bad error");
	if(!error.stack) throw new Error("No Error stack");
	let stk=error.stack;
	let imp_mod=stk.split("\n")[0];
	console.log(stk);
	let imp_line=stk.split("\n")[1].split("from")[1].trim().replaceAll(";","");
	console.log(imp_mod,imp_line);
	if(!imp_line) throw new Error("Error does not come from failed import");
	if(!imp_mod) throw new Error("Module line not found");
	let imp_real=JSON.parse(imp_line).replace(/(?<=.+)\.js/g,".ts");
	let mod_dir=path.dirname(imp_mod);
	let target_re_compile=path.join(mod_dir,imp_real).replace("file:","");
	let result=await new Promise(function(resolve,reject) {
		let cp=spawn("tsc",['-t','ESNext',target_re_compile],{});
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
