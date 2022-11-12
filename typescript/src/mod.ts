import {AutoBuy} from "./vm/AutoBuy.js"
import {SymbolRef} from "./vm/SymbolRef.js"
import {UniqueIdGenerator} from "./vm/UniqueIdGenerator.js"

export const debug_id_gen=new UniqueIdGenerator
export const auto_buy_obj=new AutoBuy
export const debug_id_syms: WeakRef<SymbolRef>[]=[]
