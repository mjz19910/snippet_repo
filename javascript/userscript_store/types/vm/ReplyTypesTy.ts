import {WorkerDestroyMessageTy} from "./WorkerDestroyMessageTy"
import {WorkerUpdateMessageHandlerReplyTy} from "./WorkerUpdateMessageHandlerReplyTy"
import {WorkerReadyReplyTy} from "./WorkerReadyReplyTy"
import {ReplyMessage1Ty} from "./ReplyMessage1Ty"
import {ReplyMessage2Ty} from "./ReplyMessage2Ty"
import {ReplyFromWorkerTy} from "./ReplyFromWorkerTy"
import {ReplyToWorkerTy} from "./ReplyToWorkerTy"
import {ReplySetMessages} from "./ReplySetMessages"
import {ReplyClearMessages} from "./ReplyClearMessages"

export type ReplyTypesTy = {
	msg1: ReplyMessage1Ty
	msg2: ReplyMessage2Ty
	from_worker: ReplyFromWorkerTy
	to_worker: ReplyToWorkerTy
	destroy_worker: WorkerDestroyMessageTy
	update_handler: WorkerUpdateMessageHandlerReplyTy
	ready: WorkerReadyReplyTy
	set: ReplySetMessages
	clear: ReplyClearMessages
}
