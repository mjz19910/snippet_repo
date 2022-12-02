import {debug_id_syms} from "./debug_id_syms.js";
import {debug_id_gen} from "./debug_id_gen.js";

export function next_debug_id() {
	const id=debug_id_gen.next();
	const sym=Symbol(id);
	debug_id_syms.push(new WeakRef({sym}));
	return sym;
}
