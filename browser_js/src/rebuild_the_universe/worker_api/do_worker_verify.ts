import {TIMER_REPEATING,TIMER_SINGLE,TIMER_TAG_COUNT} from "./constants.js";
import {WorkerVerifyType} from "./constant_types.js";
import {VERIFY} from "./VERIFY.js";

export function do_worker_verify(verify_obj: WorkerVerifyType) {
	VERIFY(verify_obj.TIMER_SINGLE===TIMER_SINGLE,"TIMER_SINGLE constant matches")
	VERIFY(verify_obj.TIMER_REPEATING===TIMER_REPEATING,"TIMER_REPEATING constant matches")
	VERIFY(verify_obj.TIMER_TAG_COUNT===TIMER_TAG_COUNT,"TIMER_TAG_COUNT constant matches")
	VERIFY(Object.keys(verify_obj).length===3,"keys(verify_obj).length is expected value")
	return
}
