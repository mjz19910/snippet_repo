import {TimeoutSingleReplyTy} from "./TimeoutSingleReplyTy.js"
import {TimeoutRepeatingReplyTy_OLD} from "./TimeoutRepeatingReplyTy.js"

export type WorkerReplyTypesTy={
	single: TimeoutSingleReplyTy
	repeating: TimeoutRepeatingReplyTy_OLD
}
