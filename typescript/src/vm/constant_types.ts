import {
	ReplyClearAny,
	ReplyClearRepeating,
	ReplyClearSingle,
	ReplyFromWorker,
	ReplySetRepeating,
	ReplySetSingle,
	ReplyToLocalTimer,
	ReplyToWorker,
	ReplyToWorkerState,
	TimeoutClearAny,
	TimeoutClearRepeating,
	TimeoutClearSingle,
	TimeoutClearStringRepeating,
	TimeoutClearStringSingle,
	TimeoutFireRepeating,
	TimeoutFireSingle,
	TimeoutMessageReady,
	TimeoutRepeatingReply,
	TimeoutSetRepeating,
	TimeoutSetSingle,
	TimeoutSetStringRepeating,
	TimeoutSetStringSingle,
	TimeoutSetTypes,
	TimeoutSingleReply,
	TIMER_REPEATING,
	TIMER_SINGLE,
	TIMER_TAG_COUNT,
	WorkerAsyncMessage,
	WorkerDestroyType,
	WorkerReadyReply,
	WorkerUpdateMessageHandler,
	WorkerUpdateMessageHandlerReply
} from "./constants.js";

export type TimeoutSetStringsT={
	single: typeof TimeoutSetStringSingle;
	repeating: typeof TimeoutSetStringRepeating;
};

export type TimeoutClearStringsT={
	single: typeof TimeoutClearStringSingle;
	repeating: typeof TimeoutClearStringRepeating;
};

export type TimeoutMessageReadyT=typeof TimeoutMessageReady;

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

export type TimeoutClearSingleT=typeof TimeoutClearSingle;
export type TimeoutClearRepeatingT=typeof TimeoutClearRepeating;
export type TimeoutClearAnyT=typeof TimeoutClearAny;
export type TimeoutClearInfoT={
	single: TimeoutClearSingleT;
	repeating: TimeoutClearRepeatingT;
	any: TimeoutClearAnyT;
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
export type ReplySetSingleT=typeof ReplySetSingle;
export type ReplySetRepeatingT=typeof ReplySetRepeating;
export type ReplySetTypesT={
	single: ReplySetSingleT;
	repeating: ReplySetRepeatingT;
};
export type ReplyClearSingleT=typeof ReplyClearSingle;
export type ReplyClearRepeatingT=typeof ReplyClearRepeating;
export type ReplyClearAnyT=typeof ReplyClearAny;
export type ReplyClearTypesT={
	single: ReplyClearSingleT;
	repeating: ReplyClearRepeatingT;
	any: ReplyClearAnyT;
};
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

export type MessageReplyFromWorkerData={
	t: 5000;
	v: number;
};

export type ReplyFromWorkerMessage={
	t: ReplyFromWorkerT;
	v: MessageReplyFromWorkerData;
};

export type ReplyClearRepeatingMessageT={
	t: ReplyClearRepeatingT;
	v: number,
};

export type ReplyClearSingleMessageT={
	t: ReplyClearSingleT;
	v: number;
};
export type ReplySetRepeatingMessageT={
	t: ReplySetRepeatingT;
	v: number;
};

export type ReplySetSingleMessageT={
	t: ReplySetSingleT;
	v: number;
};

export type TimeoutClearRepeatingMessageT={
	t: TimeoutClearRepeatingT;
	v: number;
};

export type TimeoutClearSingleMessageT={
	t: TimeoutClearSingleT;
	v: number;
};

export type TimeoutFireSingleMessageT={
	t: TimeoutFireSingleT;
	v: number;
};

export type ReplyWorkerReadyMessageT={
	t: WorkerReadyReplyT;
	v: TimeoutMessageReplyT;
};

export type MessageWorkerUpdateMessageHandlerReplyT={
	t: WorkerUpdateMessageHandlerReplyT;
	v: WorkerUpdateMessageHandlerT;
};

export type ReplyToWorkerStateMessageT={
	t: ReplyToWorkerStateT;
	v: number;
};

export type ReplyToLocalTimerMessageT={
	t: ReplyToLocalTimerT;
	v: number;
};

export type WorkerDestroyTypeMessageT={
	t: WorkerDestroyTypeT;
	v: number;
};

export type DispatchMessageType=
	TimeoutClearRepeatingMessageT|
	TimeoutClearSingleMessageT|
	ReplyClearRepeatingMessageT|
	ReplyClearSingleMessageT|
	ReplySetRepeatingMessageT|
	ReplySetSingleMessageT|
	ReplyWorkerReadyMessageT|
	MessageWorkerUpdateMessageHandlerReplyT|
	ReplyToWorkerStateMessageT|
	ReplyToLocalTimerMessageT|
	MessageReplyFromWorkerData;

export type WorkerReplyTypes=
	ReplyFromWorkerMessage|
	ReplyToLocalTimerMessageT|
	ReplyToWorkerStateMessageT|
	WorkerDestroyTypeMessageT|
	TimeoutFireSingleMessageT;

export type WorkerSendTypes=
	TimeoutSetSingleMessageT|
	TimeoutSetRepeatingMessageT|
	TimeoutFireSingleMessageT|
	TimeoutSingleReplyMessageT|
	TimeoutClearAnyMessageT|
	TimeoutClearSingleMessageT|
	TimeoutClearRepeatingMessageT;

export type SetSingleMessageDataT={
	t: number;
	v: number;
};

export type TimeoutSetSingleMessageT={
	t: TimeoutSetSingleT;
	v: SetSingleMessageDataT;
};

export type SetRepeatingMessageDataT={
	t: number;
	v: number;
};

export type TimeoutSetRepeatingMessageT={
	t: TimeoutSetRepeatingT;
	v: SetRepeatingMessageDataT;
};

export type TimeoutClearAnyMessageT={
	t: TimeoutClearAnyT;
	v: number;
};

export type TimeoutSingleReplyMessageT={
	t: TimeoutSingleReplyT;
	v: number;
};

export type WorkerVerifyType={
	TIMER_SINGLE: typeof TIMER_SINGLE;
	TIMER_REPEATING: typeof TIMER_REPEATING;
	TIMER_TAG_COUNT: typeof TIMER_TAG_COUNT;
};

export type WorkerVerifyCallback=(verify_obj: WorkerVerifyType) => void;
