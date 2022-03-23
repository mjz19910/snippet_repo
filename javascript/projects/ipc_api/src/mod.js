import {spawn} from "child_process";
import {dirname, join} from "path";
/**@type {{m_fake?:boolean;new(x:string):{on_incoming_message():void}} | null}*/
let g_FetchRequestState = class {
	static m_fake = true;
	on_incoming_message() {}
};
/**
 * @type {((arg0: { on_incoming_message(): void; }) => void) | null}
 */
let real_fetch_url = null;
/**@arg {InstanceType<Exclude<typeof g_FetchRequestState, null>>} state */
export function fetch_url(state) {
	if(!state)
		throw new Error("No state");
	if(!state.on_incoming_message)
		throw new Error("No Handler for server response");
	update_imports().then((updated) => {
		if(updated) {
			fetch_url(state);
		}
	});
	if(!real_fetch_url) return;
	real_fetch_url(state);
}

/**
 * @param {string} url
 */
export async function new_FetchRequestState(url) {
	if(g_FetchRequestState && !g_FetchRequestState.m_fake) {
		return new g_FetchRequestState(url);
	} else {
		await update_imports();
		if(g_FetchRequestState) {
			return new g_FetchRequestState(url);
		} else {
			throw new Error("bad");
		}
	}
}
async function update_imports() {
	if(real_fetch_url === null) {
		let module_page_loader_str = "../../page_loader/mod.js";
		while(true) {
			try {
				let mod = await import(module_page_loader_str);
				g_FetchRequestState = mod.FetchRequestState;
				real_fetch_url = mod.fetch_url;
				return true;
			} catch {
				module_page_loader_str = "../" + module_page_loader_str;
			}
		}
	}
	return false;
}
/**
 * @param {string[]} args
 */
function get_plugin_name(args) {
	return args.join("@");
}
/**
 * @param {string} plugin_key
 * @param {string} module_path
 */
async function try_import_module(plugin_key, module_path) {
	let mod = await import(module_path);
	g_loaded_ipc_plugins.set(plugin_key, mod);
	return mod;
}
const g_loaded_ipc_plugins = new Map;
let import_depth = 0;
/**
 * @param {string} name
 * @arg {'direct'} [opt]
 */
export async function import_ipc_plugin(name, opt) {
	let module_page_loader_str = `../../${name}/ipc_plugin/ipc_mod.js`;
	let plugin_key = `${name}@default`;
	if(opt === 'direct') {
		module_page_loader_str = `../../${name}`;
		plugin_key = get_plugin_name([name, opt]);
	}
	if(g_loaded_ipc_plugins.has(plugin_key)) {
		return g_loaded_ipc_plugins.get(plugin_key);
	}
	console.log('imp depth', import_depth);
	import_depth++;
	try {
		let mod = await try_import_module(plugin_key, module_page_loader_str);
		import_depth--;
		return mod;
	} catch(e) {
		await handle_failed_import(e, plugin_key, module_page_loader_str);
		if(g_loaded_ipc_plugins.has(plugin_key)) {
			return g_loaded_ipc_plugins.get(plugin_key);
		} else {
			throw new Error("Handling error did not load plugin");
		}
	}
}
/**
 * @param {unknown} err
 * @param {string} plugin_key
 * @param {string} module_path
 */
async function handle_failed_import(err, plugin_key, module_path) {
	let mod = null;
	let e = err;
	while(mod === null) {
		if(import_depth > 8) {
			throw new Error("ipc plugin loader overflow (import depth too high)");
		}
		if(!(e instanceof Error)) throw new Error("Bad error");
		let imp_mod = e.stack?.split("\n")[0];
		let imp_line = e.stack?.split("\n")[1].split("from")[1].trim().replaceAll(";", "");
		console.log(imp_mod, imp_line);
		if(!imp_line) throw new Error("Error does not come from failed import");
		if(!imp_mod) throw new Error("Module line not found");
		if(!imp_line.includes("types"))throw e;
		console.log(e.stack);
		let imp_real = JSON.parse(imp_line).replace(/(?<=.+)\.js/g, ".ts");
		let mod_dir = dirname(imp_mod);
		let target_re_compile = join(mod_dir, imp_real).replace("file:", "");
		const args = ['-t', 'ESNext', target_re_compile];
		console.log('tsc', args.join(" "));
		let result = await new Promise(function(acc, rej) {
			acc;
			let cp = spawn("tsc", args, {});
			cp.stdout.on("data", e => {
				process.stdout.write(e);
			});
			cp.on("error", err => {
				rej(err);
			});
			cp.on("exit", e => {
				console.log('tsc exit', e);
				acc(e);
			});
		});
		if(result !== 0) throw new Error("Failed to recompile");
		try {
			import_depth++;
			mod = await try_import_module(plugin_key, module_path);
			import_depth--;
			return mod;
		} catch(err) {
			e = err;
		}
	}
}