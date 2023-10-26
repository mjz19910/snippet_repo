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
	WorkerAsyncMessage,
	WorkerDestroyType,
	WorkerReadyReply,
	WorkerUpdateMessageHandler,
	WorkerUpdateMessageHandlerReply
} from "./constants.ts";
import {
	ReplyClearAnyT,
	ReplyClearRepeatingT,
	ReplyClearSingleT,
	ReplyClearTypesT,
	ReplyFromWorkerT,
	ReplySetRepeatingT,
	ReplySetSingleT,
	ReplySetTypesT,
	ReplyToLocalTimerT,
	ReplyToWorkerStateT,
	ReplyToWorkerT,
	ReplyTypesT,
	TimeoutClearAnyT,
	TimeoutClearInfoT,
	TimeoutClearRepeatingT,
	TimeoutClearSingleT,
	TimeoutClearStringsT,
	TimeoutFireInfoT,
	TimeoutFireRepeatingT,
	TimeoutFireSingleT,
	TimeoutMessageReplyT,
	TimeoutRepeatingReplyT,
	TimeoutSetInfoT,
	TimeoutSetRepeatingT,
	TimeoutSetSingleT,
	TimeoutSetStringsT,
	TimeoutSetTypesT,
	TimeoutSingleReplyT,
	TimeoutWorkerTypesT,
	TimerMessageTypesT,
	WorkerAsyncMessageT,
	WorkerDestroyTypeT,
	WorkerReadyReplyT,
	WorkerReplyTimerFireTypesT,
	WorkerUpdateMessageHandlerReplyT,
	WorkerUpdateMessageHandlerT
} from "./constant_types.ts";
import {WorkerReplyTypesT} from "./WorkerReplyTypesT";

export class TimeoutClearStrings implements TimeoutClearStringsT {
	single: typeof TimeoutClearStringSingle=TimeoutClearStringSingle;
	repeating: typeof TimeoutClearStringRepeating=TimeoutClearStringRepeating;
}

export class TimeoutSetStrings implements TimeoutSetStringsT {
	single: typeof TimeoutSetStringSingle=TimeoutSetStringSingle;
	repeating: typeof TimeoutSetStringRepeating=TimeoutSetStringRepeating;
}

export class TimerMessageTypes implements TimerMessageTypesT {
	async: WorkerAsyncMessageT=WorkerAsyncMessage;
	reply=new ReplyTypes;
	fire=new TimeoutFireInfo;
	worker=new TimeoutWorkerTypes;
}

export class TimeoutWorkerTypes implements TimeoutWorkerTypesT {
	reply=new WorkerReplyTypes;
	update_message_handler: WorkerUpdateMessageHandlerT=WorkerUpdateMessageHandler;
	ready: TimeoutMessageReplyT=TimeoutMessageReady;
	set=new TimeoutSetInfo;
	clear=new TimeoutClearInfo;
	set_types: TimeoutSetTypesT=TimeoutSetTypes;
}

export class ReplyTypes implements ReplyTypesT {
	destroy_worker: WorkerDestroyTypeT=WorkerDestroyType;
	update_handler: WorkerUpdateMessageHandlerReplyT=WorkerUpdateMessageHandlerReply;
	ready: WorkerReadyReplyT=WorkerReadyReply;
	set=new ReplySetTypes;
	clear=new ReplyClearMessages;
	reply_to_local: ReplyToWorkerStateT=ReplyToWorkerState;
	reply_to_main_timer: ReplyToLocalTimerT=ReplyToLocalTimer;
	from_worker: ReplyFromWorkerT=ReplyFromWorker;
	to_worker: ReplyToWorkerT=ReplyToWorker;
}

export class ReplyClearMessages implements ReplyClearTypesT {
	single: ReplyClearSingleT=ReplyClearSingle;
	repeating: ReplyClearRepeatingT=ReplyClearRepeating;
	any: ReplyClearAnyT=ReplyClearAny;
}

export class ReplySetTypes implements ReplySetTypesT {
	single: ReplySetSingleT=ReplySetSingle;
	repeating: ReplySetRepeatingT=ReplySetRepeating;
}

export class TimeoutClearInfo implements TimeoutClearInfoT {
	single: TimeoutClearSingleT=TimeoutClearSingle;
	repeating: TimeoutClearRepeatingT=TimeoutClearRepeating;
	any: TimeoutClearAnyT=TimeoutClearAny;
}

export class TimeoutFireInfo implements TimeoutFireInfoT {
	single: TimeoutFireSingleT=TimeoutFireSingle;
	repeating: TimeoutFireRepeatingT=TimeoutFireRepeating;
}

export class TimeoutSetInfo implements TimeoutSetInfoT {
	single: TimeoutSetSingleT=TimeoutSetSingle;
	repeating: TimeoutSetRepeatingT=TimeoutSetRepeating;
}

export class WorkerReplyTypes implements WorkerReplyTypesT {
	fire=new WorkerReplyTimerFireTypes;
}

export class WorkerReplyTimerFireTypes implements WorkerReplyTimerFireTypesT {
	single: TimeoutSingleReplyT=TimeoutSingleReply;
	repeating: TimeoutRepeatingReplyT=TimeoutRepeatingReply;
}
