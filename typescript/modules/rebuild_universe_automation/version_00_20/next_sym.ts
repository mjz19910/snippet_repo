import {sym_id_gen, sym_id_syms} from "./rebuild_the_universe_auto_v0.2";

export function next_sym() {
	const id = sym_id_gen.next();
	const sym = Symbol(id);
	sym_id_syms.push(sym);
	return sym;
}
