import {
	ReplyClearAny,
	ReplyClearRepeating,
	ReplyClearSingle,
	ReplyFromWorker,
	ReplyMessage1,
	ReplyMessage2,
	ReplySetRepeating,
	ReplySetSingle,
	ReplyToWorker,
	TimeoutClearAny,
	TimeoutClearRepeating,
	TimeoutClearSingle,
	TimeoutFireRepeating,
	TimeoutFireSingle,
	TimeoutMessageReady,
	TimeoutRepeatingReply,
	TimeoutSetRepeating,
	TimeoutSetSingle,
	TimeoutSetTypes,
	TimeoutSingleReply,
	WorkerAsyncMessage,
	WorkerDestroyType,
	WorkerReadyReply,
	WorkerUpdateMessageHandler,
	WorkerUpdateMessageHandlerReply
} from "../constants.js";
export type ReplySetRepeatingTy=typeof ReplySetRepeating;
export type ReplySetSingleTy=typeof ReplySetSingle;
export type ReplySetTypesT={
	single: ReplySetSingleTy;
	repeating: ReplySetRepeatingTy;
};
export type TimeoutRepeatingReplyTy=typeof TimeoutRepeatingReply;
export type TimeoutSingleReplyTy=typeof TimeoutSingleReply;
export type WorkerReplyTypesTy={
	single: TimeoutSingleReplyTy;
	repeating: TimeoutRepeatingReplyTy;
};
export type WorkerReplyTypesT={
	fire: WorkerReplyTypesTy;
};
export type TimeoutSetRTy=typeof TimeoutSetRepeating;
export type TimeoutSetSTy=typeof TimeoutSetSingle;
export type TimeoutMessageReplyTy=typeof TimeoutMessageReady;
export type TimeoutSetInfoTy={
	single: TimeoutSetSTy;
	repeating: TimeoutSetRTy;
};
export type TimeoutSetTypesTy=typeof TimeoutSetTypes;
export type WorkerReadyReplyTy=typeof WorkerReadyReply;
export type WorkerUpdateMessageHandlerReplyTy=typeof WorkerUpdateMessageHandlerReply;
export type WorkerUpdateMessageHandlerTy=typeof WorkerUpdateMessageHandler;
export type ReplyClearAnyTy=typeof ReplyClearAny;
export type ReplyClearRepeatingTy=typeof ReplyClearRepeating;
export type ReplyClearSingleTy=typeof ReplyClearSingle;
export type TimeoutClearATy=typeof TimeoutClearAny;
export type TimeoutClearRTy=typeof TimeoutClearRepeating;
export type TimeoutClearSTy=typeof TimeoutClearSingle;
export type TimeoutClearInfoTy={
	single: TimeoutClearSTy;
	repeating: TimeoutClearRTy;
	any: TimeoutClearATy;
};

export type TimeoutFireSingleT=typeof TimeoutFireSingle;
export type TimeoutFireRepeatingT=typeof TimeoutFireRepeating;
export type TimeoutFireInfoT={
	single: TimeoutFireSingleT;
	repeating: TimeoutFireRepeatingT;
};
export type ReplyMessage1Ty=typeof ReplyMessage1;
export type ReplyMessage2Ty=typeof ReplyMessage2;
export type ReplyFromWorkerTy=typeof ReplyFromWorker;
export type ReplyToWorkerTy=typeof ReplyToWorker;
export type WorkerDestroyTypeT=typeof WorkerDestroyType;
export type ReplyTypesT={
	msg1: ReplyMessage1Ty;
	msg2: ReplyMessage2Ty;
	from_worker: ReplyFromWorkerTy;
	to_worker: ReplyToWorkerTy;
	destroy_worker: WorkerDestroyTypeT;
	update_handler: WorkerUpdateMessageHandlerReplyTy;
	ready: WorkerReadyReplyTy;
	set: ReplySetTypesT;
	clear: ReplyClearTypes;
};
export type TimeoutWorkerTypesT={
	reply: WorkerReplyTypesT;
	update_message_handler: WorkerUpdateMessageHandlerTy;
	ready: TimeoutMessageReplyTy;
	set: TimeoutSetInfoTy;
	clear: TimeoutClearInfoTy;
	set_types: TimeoutSetTypesTy;
};
export type WorkerAsyncMessageT=typeof WorkerAsyncMessage;
export type TimerMessageTypesT={
	async: WorkerAsyncMessageT;
	reply: ReplyTypesT;
	fire: TimeoutFireInfoT;
	worker: TimeoutWorkerTypesT;
};
export type ReplyClearTypes={
	single: ReplyClearSingleTy;
	repeating: ReplyClearRepeatingTy;
	any: ReplyClearAnyTy;
};

