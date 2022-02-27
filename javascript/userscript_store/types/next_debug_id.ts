import {debug_id_gen, debug_id_syms} from "../rebuild_the_universe_auto_typed_v0.2";

export function next_debug_id() {
	const id = debug_id_gen.next();
	const sym = Symbol(id);
	debug_id_syms.push(new WeakRef({sym}));
	return sym;
}
