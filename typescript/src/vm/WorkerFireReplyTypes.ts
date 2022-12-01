import {TimeoutSingleReplyTy} from "./TimeoutSingleReplyTy.js"
import {TimeoutRepeatingReplyTy_OLD} from "./TimeoutRepeatingReplyTy.js"
import {WorkerReplyTypesTy} from "./WorkerReplyTypesTy.js"
import {TimeoutSingleReply,TimeoutRepeatingReply} from "../constants.js"

export class WorkerFireReplyTypes implements WorkerReplyTypesTy {
	single: TimeoutSingleReplyTy=TimeoutSingleReply
	repeating: TimeoutRepeatingReplyTy_OLD=TimeoutRepeatingReply
}
