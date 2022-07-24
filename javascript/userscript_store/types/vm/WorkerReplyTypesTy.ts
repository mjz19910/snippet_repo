import {TimeoutSingleReplyTy} from "./TimeoutSingleReplyTy"
import {TimeoutRepeatingReplyTy} from "./TimeoutRepeatingReplyTy"

export type WorkerReplyTypesTy = {
	single: TimeoutSingleReplyTy
	repeating: TimeoutRepeatingReplyTy
}
