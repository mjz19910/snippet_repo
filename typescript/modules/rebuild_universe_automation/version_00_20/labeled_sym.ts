import {named_sym_gen, sym_id_syms} from "./rebuild_the_universe_auto_v0.2";

/**@type {(v:string)=>symbol} */
export function labeled_sym(name) {
	const id = named_sym_gen.next_named(name);
	const sym = Symbol(`${name}@${id}`);
	sym_id_syms.push([name, id, sym]);
	return sym;
}
