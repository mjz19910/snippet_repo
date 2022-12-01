import {ReplySetTypes} from "./ReplySetTypes.js";
import {ReplyClearMessages} from "./ReplyClearMessages.js";

import {
	ReplyToWorkerState,
	ReplyToLocalTimer,
	ReplyFromWorker,
	ReplyToWorker,
	WorkerDestroyType,
	WorkerUpdateMessageHandlerReply,
	WorkerReadyReply
} from "./constants.js";

import {
	ReplyFromWorkerT,
	ReplyToLocalTimerT,
	ReplyToWorkerStateT,
	ReplyToWorkerT,
	ReplyTypesT,
	WorkerDestroyTypeT,
	WorkerReadyReplyT,
	WorkerUpdateMessageHandlerReplyT
} from "./constant_types.js";

export class ReplyTypes implements ReplyTypesT {
	reply_to_local: ReplyToWorkerStateT=ReplyToWorkerState;
	reply_to_main_timer: ReplyToLocalTimerT=ReplyToLocalTimer;
	from_worker: ReplyFromWorkerT=ReplyFromWorker;
	to_worker: ReplyToWorkerT=ReplyToWorker;
	destroy_worker: WorkerDestroyTypeT=WorkerDestroyType;
	update_handler: WorkerUpdateMessageHandlerReplyT=WorkerUpdateMessageHandlerReply;
	ready: WorkerReadyReplyT=WorkerReadyReply;
	set=new ReplySetTypes;
	clear=new ReplyClearMessages;
}
