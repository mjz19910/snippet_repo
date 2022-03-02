import {AutoBuy} from "./AutoBuy";
import {BaseMutationObserver} from "./BaseMutationObserver.js";
import {module_entry_function} from "./module_entry_function";
import {NamedIdGenerator} from "./NamedIdGenerator";
import {UniqueIdGenerator} from "./UniqueIdGenerator";
export const debug_id_gen = new UniqueIdGenerator;
/**@type {WeakRef<{sym:symbol}>[]}*/
export const debug_id_syms = [];
export const sym_id_gen = new UniqueIdGenerator;
export const named_sym_gen = new NamedIdGenerator;
/**@type {(symbol | [string, number, symbol])[]} */
export const sym_id_syms = [];
export const auto_buy_obj = new AutoBuy;
export let seen_elements = new WeakSet;
/**@type {BaseMutationObserver[]} */
export let mut_observers = [];
window.g_mut_observers = mut_observers;
module_entry_function();
