import {WorkerDestroyTypeT} from "./WorkerDestroyTypeT.js"
import {WorkerUpdateMessageHandlerReplyTy} from "./WorkerUpdateMessageHandlerReplyTy.js"
import {WorkerReadyReplyTy} from "./WorkerReadyReplyTy.js"
import {ReplyMessage1Ty} from "./ReplyMessage1Ty.js"
import {ReplyMessage2Ty} from "./ReplyMessage2Ty.js"
import {ReplyFromWorkerTy} from "./ReplyFromWorkerTy.js"
import {ReplyToWorkerTy} from "./ReplyToWorkerTy.js"
import {ReplySetTypes} from "./ReplySetTypes.js"
import {ReplyClearMessages} from "./ReplyClearMessages.js"

export type ReplyTypesTy={
	msg1: ReplyMessage1Ty
	msg2: ReplyMessage2Ty
	from_worker: ReplyFromWorkerTy
	to_worker: ReplyToWorkerTy
	destroy_worker: WorkerDestroyTypeT
	update_handler: WorkerUpdateMessageHandlerReplyTy
	ready: WorkerReadyReplyTy
	set: ReplySetTypes
	clear: ReplyClearMessages
}
