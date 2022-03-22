/**@type {{m_fake?:boolean;new(x:string):{on_incoming_message():void}} | null}*/
let g_FetchRequestState = class {
	static m_fake=true;
	on_incoming_message(){}
}
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
				module_page_loader_str = "../"+module_page_loader_str;
			}
		}
	}
	return false;
}
const g_loaded_ipc_plugins = new Map;

/**
 * @param {string} name
 */
export async function import_ipc_plugin(name) {
	if(g_loaded_ipc_plugins.has(name)){
		return g_loaded_ipc_plugins.get(name);
	}
	let module_page_loader_str = `../../${name}/ipc_plugin/ipc_mod.js`;
	let mod=await import(module_page_loader_str);
	g_loaded_ipc_plugins.set(name, mod);
	return mod;
}
