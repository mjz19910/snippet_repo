import {GCStorage} from "./GCStorage.js";
import {HeldType} from "./HeldType.js";

export function script_reg_cleanup_callback(held: HeldType) {
	GCStorage.cleanup_with_held(held);
}
