import {AutoBuy} from "../../../vm/AutoBuy.js"
import {BaseMutationObserver} from "./BaseMutationObserver.js"
import {module_entry_function} from "./module_entry_function.js"

export const auto_buy_obj=new AutoBuy
export let seen_elements=new WeakSet
export let mut_observers: BaseMutationObserver[]=[]

window.g_mut_observers=mut_observers
module_entry_function()
