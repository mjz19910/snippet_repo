import {WorkerUpdateMessageHandlerTy} from "./WorkerUpdateMessageHandlerTy";
import {TimeoutMessageRTy} from "./TimeoutMessageRTy";
import {TimeoutSetTypesTy} from "./TimeoutSetTypesTy";
import {TimeoutSetInfoTy} from "./TimeoutSetInfoTy";
import {TimeoutClearInfoTy} from "./TimeoutClearInfoTy";
import {WorkerReplyTypes} from "./rebuild_the_universe_auto_typed_v0.2";

export type TimeoutWorkerTypesTy = {
	reply: WorkerReplyTypes;
	update_message_handler: WorkerUpdateMessageHandlerTy;
	ready: TimeoutMessageRTy;
	set: TimeoutSetInfoTy;
	clear: TimeoutClearInfoTy;
	set_types: TimeoutSetTypesTy;
};
