import {spawn} from "child_process"
import {dirname,join} from "path"
import {state,import_ipc_plugin} from "./mod"
/**
 * @param {unknown} err
 * @param {["repl_plugin_manager/mod.js", "direct"] | [name: "tiny_html_lexer", opt: "default"] | [name: "tiny_html_parser", opt: "default"]} import_args
 */
export async function handle_failed_import(err,import_args) {
	let mod=null
	let e=err
	while(mod===null) {
		if(state.depth>8) {
			throw new Error("ipc plugin loader overflow (import depth too high)")
		}
		if(!(e instanceof Error))
			throw new Error("Bad error")
		let imp_mod=e.stack?.split("\n")[0]
		console.log(e.stack)
		let imp_line=e.stack?.split("\n")[1].split("from")[1].trim().replaceAll(";","")
		console.log(imp_mod,imp_line)
		if(!imp_line)
			throw new Error("Error does not come from failed import")
		if(!imp_mod)
			throw new Error("Module line not found")
		if(!imp_line.includes("types"))
			throw e
		console.log(e.stack)
		let imp_real=JSON.parse(imp_line).replace(/(?<=.+)\.js/g,".ts")
		let mod_dir=dirname(imp_mod)
		let target_re_compile=join(mod_dir,imp_real).replace("file:","")
		const args=['-t','ESNext',target_re_compile]
		console.log('tsc',args.join(" "))
		let result=await new Promise(function(acc,rej) {
			acc
			let cp=spawn("tsc",args,{})
			cp.stdout.on("data",e => {
				process.stdout.write(e)
			})
			cp.on("error",err => {
				rej(err)
			})
			cp.on("exit",e => {
				console.log('tsc exit',e)
				acc(e)
			})
		})
		if(result!==0)
			throw new Error("Failed to recompile")
		let failed_to_load=false
		try {
			switch(import_args[0]) {
				case 'repl_plugin_manager/mod.js': return import_ipc_plugin(import_args[0],import_args[1])
				case 'tiny_html_lexer': return import_ipc_plugin(import_args[0],import_args[1])
				case 'tiny_html_parser': return import_ipc_plugin(import_args[0],import_args[1])
				default: failed_to_load=true; break
			}
		} catch(err) {
			e=err
		}
		if(failed_to_load) {
			throw new Error("Unable to load "+import_args[0])
		}
	}
}
