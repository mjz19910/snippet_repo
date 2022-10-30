import {WorkerDestroyMessageTy} from "./WorkerDestroyMessageTy"
import {WorkerUpdateMessageHandlerReplyTy} from "./WorkerUpdateMessageHandlerReplyTy"
import {WorkerReadyReplyTy} from "./WorkerReadyReplyTy"
import {ReplyMessage1Ty} from "./ReplyMessage1Ty"
import {ReplyMessage2Ty} from "./ReplyMessage2Ty"
import {ReplyFromWorkerTy} from "./ReplyFromWorkerTy"
import {ReplyToWorkerTy} from "./ReplyToWorkerTy"
import {ReplySetMessages} from "./ReplySetMessages"
import {ReplyClearMessages} from "./ReplyClearMessages"
import {ReplyMessage1,ReplyMessage2,ReplyFromWorker,ReplyToWorker,WorkerDestroyMessage,WorkerUpdateMessageHandlerReply,WorkerReadyReply} from "typescript/constants"

export class ReplyTypes {
	msg1: ReplyMessage1Ty=ReplyMessage1
	msg2: ReplyMessage2Ty=ReplyMessage2
	from_worker: ReplyFromWorkerTy=ReplyFromWorker
	to_worker: ReplyToWorkerTy=ReplyToWorker
	destroy_worker: WorkerDestroyMessageTy=WorkerDestroyMessage
	update_handler: WorkerUpdateMessageHandlerReplyTy=WorkerUpdateMessageHandlerReply
	ready: WorkerReadyReplyTy=WorkerReadyReply
	set=new ReplySetMessages
	clear=new ReplyClearMessages
}
