import {Extern} from "./use_extern.js";
/**@arg {Parameters<typeof Extern.fetch_url>[0]} state */
export async function fetch_url(state) {
	await Extern.fetch_url(state)
}
