import {VERIFY} from "./VERIFY";
import {WorkerVerifyType} from "./WorkerVerifyType";
import {TIMER_SINGLE, TIMER_REPEATING, TIMER_TAG_COUNT} from "../typed_mod_rebuild_auto";

export function do_worker_verify(verify_obj: WorkerVerifyType) {
	VERIFY(verify_obj.TIMER_SINGLE === TIMER_SINGLE, "TIMER_SINGLE constant matches");
	VERIFY(verify_obj.TIMER_REPEATING === TIMER_REPEATING, "TIMER_REPEATING constant matches");
	VERIFY(verify_obj.TIMER_TAG_COUNT === TIMER_TAG_COUNT, "TIMER_TAG_COUNT constant matches");
	VERIFY(Object.keys(verify_obj).length === 3, "keys(verify_obj).length is expected value");
	return;
}
