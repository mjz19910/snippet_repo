import {WorkerDestroyTypeT_OLD} from "./WorkerDestroyTypeT.js";
import {WorkerUpdateMessageHandlerReplyTy_OLD} from "./WorkerUpdateMessageHandlerReplyTy.js";
import {WorkerReadyReplyTy_OLD} from "./WorkerReadyReplyTy.js";
import {ReplyMessage1Ty_OLD} from "./ReplyMessage1Ty.js";
import {ReplyMessage2Ty_OLD} from "./ReplyMessage2Ty.js";
import {ReplyToWorkerTy_OLD} from "./ReplyToWorkerTy.js";
import {ReplySetTypes_OLD} from "./ReplySetTypes.js";
import {ReplyClearMessages_OLD} from "./ReplyClearMessages.js";
import {ReplyToWorkerState,ReplyToLocalTimer,ReplyFromWorker,ReplyToWorker,WorkerDestroyType,WorkerUpdateMessageHandlerReply,WorkerReadyReply} from "../constants.js";
import {
	ReplyFromWorkerT,
	ReplyTypesT
} from "./constant_types.js";

export class ReplyTypes implements ReplyTypesT {
	reply_to_local: ReplyMessage1Ty_OLD=ReplyToWorkerState;
	reply_to_main_timer: ReplyMessage2Ty_OLD=ReplyToLocalTimer;
	from_worker: ReplyFromWorkerT=ReplyFromWorker;
	to_worker: ReplyToWorkerTy_OLD=ReplyToWorker;
	destroy_worker: WorkerDestroyTypeT_OLD=WorkerDestroyType;
	update_handler: WorkerUpdateMessageHandlerReplyTy_OLD=WorkerUpdateMessageHandlerReply;
	ready: WorkerReadyReplyTy_OLD=WorkerReadyReply;
	set=new ReplySetTypes_OLD;
	clear=new ReplyClearMessages_OLD;
}
