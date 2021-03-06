import {TimeoutSingleReplyTy} from "./TimeoutSingleReplyTy"
import {TimeoutRepeatingReplyTy} from "./TimeoutRepeatingReplyTy"
import {WorkerReplyTypesTy} from "./WorkerReplyTypesTy"
import {TimeoutSingleReply, TimeoutRepeatingReply} from "types/constants"

export class WorkerFireReplyTypes implements WorkerReplyTypesTy {
	single: TimeoutSingleReplyTy = TimeoutSingleReply
	repeating: TimeoutRepeatingReplyTy = TimeoutRepeatingReply
}
