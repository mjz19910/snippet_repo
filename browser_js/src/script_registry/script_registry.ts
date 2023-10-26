import {script_reg_cleanup_callback} from "./script_reg_cleanup_callback.ts";

export let script_registry: FinalizationRegistry<{}>=new FinalizationRegistry(script_reg_cleanup_callback);
