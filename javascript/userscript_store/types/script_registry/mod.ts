import {Counter} from "./Counter"
import {HeldType} from "./HeldType"
import {script_reg_cleanup_callback} from "./script_reg_cleanup_callback"
import {PtrWithKeySymbolToWeakTokenSymbolPtr} from "./TokenType"
import {WeakFinalInfo} from "./WeakFinalInfo"

export let is_in_userscript_fn: {flag: boolean}={flag: false}
export let is_in_userscript: {flag: boolean}={flag: false}
export var is_in_ignored_from_src_fn: {flag: boolean}={flag: false}
export let scripts=new WeakSet
export let scripts_holders: HeldType[]=[]
export let scripts_tokens: (PtrWithKeySymbolToWeakTokenSymbolPtr|null)[]=[]
export let weak_scripts_arr: (WeakFinalInfo|null)[]=[]
export let script_id=new Counter
export const attached_proxy_arr: any[]=[]
export let script_registry: FinalizationRegistry<{}>=new FinalizationRegistry(script_reg_cleanup_callback)
export {main as script_registry_main} from "./main"
