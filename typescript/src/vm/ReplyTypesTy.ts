import {WorkerDestroyTypeT as WorkerDestroyTypeT_OLD} from "./WorkerDestroyTypeT.js";
import {WorkerUpdateMessageHandlerReplyTy as WorkerUpdateMessageHandlerReplyTy_OLD} from "./WorkerUpdateMessageHandlerReplyTy.js";
import {WorkerReadyReplyTy as WorkerReadyReplyTy_OLD} from "./WorkerReadyReplyTy.js";
import {ReplyMessage1Ty_OLD} from "./ReplyMessage1Ty.js";
import {ReplyMessage2Ty_OLD} from "./ReplyMessage2Ty.js";
import {ReplyToWorkerTy as ReplyToWorkerTy_OLD} from "./ReplyToWorkerTy.js";
import {ReplySetTypes as ReplySetTypes_OLD} from "./ReplySetTypes.js";
import {ReplyClearMessages as ReplyClearMessages_OLD} from "./ReplyClearMessages.js";
import {ReplyFromWorkerT} from "./constant_types.js";

export type ReplyTypesTy_OLD={
	msg1: ReplyMessage1Ty_OLD;
	msg2: ReplyMessage2Ty_OLD;
	from_worker: ReplyFromWorkerT;
	to_worker: ReplyToWorkerTy_OLD;
	destroy_worker: WorkerDestroyTypeT_OLD;
	update_handler: WorkerUpdateMessageHandlerReplyTy_OLD;
	ready: WorkerReadyReplyTy_OLD;
	set: ReplySetTypes_OLD;
	clear: ReplyClearMessages_OLD;
};
