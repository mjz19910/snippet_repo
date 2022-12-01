import {
	ReplyClearAny,
	ReplyClearRepeating,
	ReplyClearSingle,
	ReplyFromWorker,
	ReplyToWorkerState,
	ReplyToLocalTimer,
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
export type ReplySetSingleT=typeof ReplySetSingle;
export type ReplySetRepeatingT=typeof ReplySetRepeating;
export type ReplySetTypesT={
	single: ReplySetSingleT;
	repeating: ReplySetRepeatingT;
};

export type TimeoutSingleReplyT=typeof TimeoutSingleReply;
export type TimeoutRepeatingReplyT=typeof TimeoutRepeatingReply;
export type WorkerReplyTimerFireTypesT={
	single: TimeoutSingleReplyT;
	repeating: TimeoutRepeatingReplyT;
};

export type TimeoutSetRepeatingT=typeof TimeoutSetRepeating;
export type TimeoutSetSingleT=typeof TimeoutSetSingle;
export type TimeoutSetInfoT={
	single: TimeoutSetSingleT;
	repeating: TimeoutSetRepeatingT;
};

export type TimeoutClearSTy=typeof TimeoutClearSingle;
export type TimeoutClearRTy=typeof TimeoutClearRepeating;
export type TimeoutClearATy=typeof TimeoutClearAny;
export type TimeoutClearInfoT={
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

export type ReplyToWorkerStateT=typeof ReplyToWorkerState;
export type ReplyToLocalTimerT=typeof ReplyToLocalTimer;
export type ReplyFromWorkerT=typeof ReplyFromWorker;
export type ReplyToWorkerT=typeof ReplyToWorker;
export type WorkerDestroyTypeT=typeof WorkerDestroyType;
export type WorkerUpdateMessageHandlerReplyT=typeof WorkerUpdateMessageHandlerReply;
export type WorkerReadyReplyT=typeof WorkerReadyReply;
export type ReplyTypesT={
	reply_to_local: ReplyToWorkerStateT;
	reply_to_main_timer: ReplyToLocalTimerT;
	from_worker: ReplyFromWorkerT;
	to_worker: ReplyToWorkerT;
	destroy_worker: WorkerDestroyTypeT;
	update_handler: WorkerUpdateMessageHandlerReplyT;
	ready: WorkerReadyReplyT;
	set: ReplySetTypesT;
	clear: ReplyClearTypesT;
};

export type WorkerReplyTypesT={
	fire: WorkerReplyTimerFireTypesT;
};

export type WorkerUpdateMessageHandlerT=typeof WorkerUpdateMessageHandler;
export type TimeoutMessageReplyT=typeof TimeoutMessageReady;
export type TimeoutSetTypesT=typeof TimeoutSetTypes;
export type TimeoutWorkerTypesT={
	reply: WorkerReplyTypesT;
	update_message_handler: WorkerUpdateMessageHandlerT;
	ready: TimeoutMessageReplyT;
	set: TimeoutSetInfoT;
	clear: TimeoutClearInfoT;
	set_types: TimeoutSetTypesT;
};
export type WorkerAsyncMessageT=typeof WorkerAsyncMessage;
export type TimerMessageTypesT={
	async: WorkerAsyncMessageT;
	reply: ReplyTypesT;
	fire: TimeoutFireInfoT;
	worker: TimeoutWorkerTypesT;
};

export type ReplyClearAnyT=typeof ReplyClearAny;
export type ReplyClearRepeatingT=typeof ReplyClearRepeating;
export type ReplyClearSingleT=typeof ReplyClearSingle;
export type ReplyClearTypesT={
	single: ReplyClearSingleT;
	repeating: ReplyClearRepeatingT;
	any: ReplyClearAnyT;
};

