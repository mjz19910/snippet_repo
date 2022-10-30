import {AutoBuy} from "../../../vm/AutoBuy"
import {BaseMutationObserver} from "./BaseMutationObserver"
import {module_entry_function} from "./module_entry_function"

export const auto_buy_obj=new AutoBuy
export let seen_elements=new WeakSet
export let mut_observers: BaseMutationObserver[]=[]

window.g_mut_observers=mut_observers
module_entry_function()
