import {TimeoutClearInfoT, TimeoutMessageReplyT, TimeoutSetInfoT, TimeoutSetTypesT, WorkerReplyTypesT, WorkerUpdateMessageHandlerT} from "./constant_types.js";

export type TimeoutWorkerTypesTy_OLD={
	reply: WorkerReplyTypesT
	update_message_handler: WorkerUpdateMessageHandlerT
	ready: TimeoutMessageReplyT
	set: TimeoutSetInfoT
	clear: TimeoutClearInfoT
	set_types: TimeoutSetTypesT
}
