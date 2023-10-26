import {GCStore} from "./gc_store/GCStore.js";
import {HeldType} from "./HeldType.ts";

export function script_reg_cleanup_callback(held: HeldType) {
	GCStore.cleanup_with_held(held);
}
