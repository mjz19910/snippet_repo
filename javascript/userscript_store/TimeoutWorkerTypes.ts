import {WorkerUpdateMessageHandlerTy} from "./WorkerUpdateMessageHandlerTy";
import {TimeoutMessageRTy} from "./TimeoutMessageRTy";
import {TimeoutSetTypesTy} from "./TimeoutSetTypesTy";
import {TimeoutWorkerTypesTy} from "./TimeoutWorkerTypesTy";
import {WorkerReplyTypes} from "./WorkerReplyTypes";
import {TimeoutSetInfo} from "./TimeoutSetInfo";
import {TimeoutClearInfo} from "./TimeoutClearInfo";
import {WorkerUpdateMessageHandler, TimeoutMessageR, TimeoutSetTypes} from "./rebuild_the_universe_auto_typed_v0.2";

export class TimeoutWorkerTypes implements TimeoutWorkerTypesTy {
	reply: WorkerReplyTypes = new WorkerReplyTypes;
	update_message_handler: WorkerUpdateMessageHandlerTy = WorkerUpdateMessageHandler;
	ready: TimeoutMessageRTy = TimeoutMessageR;
	set: TimeoutSetInfo = new TimeoutSetInfo;
	clear: TimeoutClearInfo = new TimeoutClearInfo;
	set_types: TimeoutSetTypesTy = TimeoutSetTypes;
}
