import {AutoBuy} from "../../../vm/AutoBuy"
import {BaseMutationObserver} from "./BaseMutationObserver"
import {module_entry_function} from "./module_entry_function"
import {NamedIdGenerator} from "./NamedIdGenerator"
import {named_sym_gen_item} from "./named_sym_gen_item"
import {sym_id_gen_item} from "./sym_id_gen_item"
import {UniqueIdGenerator} from "./UniqueIdGenerator"

export const debug_id_gen=new UniqueIdGenerator
export const debug_id_syms: WeakRef<{sym: symbol}>[]=[]
export const sym_id_gen=new UniqueIdGenerator
export const named_sym_gen=new NamedIdGenerator
export const sym_id_syms: (named_sym_gen_item|sym_id_gen_item)[]=[]
export const auto_buy_obj=new AutoBuy
export let seen_elements=new WeakSet
export let mut_observers: BaseMutationObserver[]=[]

window.g_mut_observers=mut_observers
module_entry_function()
