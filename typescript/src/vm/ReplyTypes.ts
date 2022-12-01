import {WorkerDestroyTypeT} from "./WorkerDestroyTypeT.js"
import {WorkerUpdateMessageHandlerReplyTy} from "./WorkerUpdateMessageHandlerReplyTy.js"
import {WorkerReadyReplyTy} from "./WorkerReadyReplyTy.js"
import {ReplyMessage1Ty} from "./ReplyMessage1Ty.js"
import {ReplyMessage2Ty} from "./ReplyMessage2Ty.js"
import {ReplyFromWorkerTy} from "./ReplyFromWorkerTy.js"
import {ReplyToWorkerTy} from "./ReplyToWorkerTy.js"
import {ReplySetMessages} from "./ReplySetMessages.js"
import {ReplyClearMessages} from "./ReplyClearMessages.js"
import {ReplyMessage1,ReplyMessage2,ReplyFromWorker,ReplyToWorker,WorkerDestroyType,WorkerUpdateMessageHandlerReply,WorkerReadyReply} from "../constants.js"
import {ReplyTypesT} from "./constant_types.js";

export class ReplyTypes implements ReplyTypesT {
	msg1: ReplyMessage1Ty=ReplyMessage1
	msg2: ReplyMessage2Ty=ReplyMessage2
	from_worker: ReplyFromWorkerTy=ReplyFromWorker
	to_worker: ReplyToWorkerTy=ReplyToWorker
	destroy_worker: WorkerDestroyTypeT=WorkerDestroyType
	update_handler: WorkerUpdateMessageHandlerReplyTy=WorkerUpdateMessageHandlerReply
	ready: WorkerReadyReplyTy=WorkerReadyReply
	set=new ReplySetMessages
	clear=new ReplyClearMessages
}
