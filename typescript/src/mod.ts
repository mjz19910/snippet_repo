import {AutoBuy} from "../vm/AutoBuy"
import {SymbolRef} from "../vm/SymbolRef"
import {UniqueIdGenerator} from "../vm/UniqueIdGenerator"

export const debug_id_gen=new UniqueIdGenerator
export const auto_buy_obj=new AutoBuy
export const debug_id_syms: WeakRef<SymbolRef>[]=[]
