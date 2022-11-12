import {TimeoutSingleReplyTy} from "./TimeoutSingleReplyTy.js"
import {TimeoutRepeatingReplyTy} from "./TimeoutRepeatingReplyTy.js"

export type WorkerReplyTypesTy={
	single: TimeoutSingleReplyTy
	repeating: TimeoutRepeatingReplyTy
}
