import {TimeoutSingleReplyTy} from "./TimeoutSingleReplyTy.js"
import {TimeoutRepeatingReplyTy} from "./TimeoutRepeatingReplyTy.js"
import {WorkerReplyTypesTy} from "./WorkerReplyTypesTy.js"
import {TimeoutSingleReply,TimeoutRepeatingReply} from "src/constants.js"

export class WorkerFireReplyTypes implements WorkerReplyTypesTy {
	single: TimeoutSingleReplyTy=TimeoutSingleReply
	repeating: TimeoutRepeatingReplyTy=TimeoutRepeatingReply
}
