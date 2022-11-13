import {Counter} from "./Counter.js";
import {script_reg_cleanup_callback} from "./script_reg_cleanup_callback.js";
import {WeakTokenSymbolWithKey} from "./WeakTokenSymbolWithKey.js";
import {WeakFinalInfo} from "./WeakFinalInfo.js";

export let weak_scripts_arr: (WeakFinalInfo|null)[]=[];
export let script_id=new Counter;
export const attached_proxy_arr: ((...args: any[]) => any)[]=[];
export let script_registry: FinalizationRegistry<{}>=new FinalizationRegistry(script_reg_cleanup_callback);
export {main as script_registry_main} from "./main.js";
