import {WorkerUpdateMessageHandlerTy} from "./WorkerUpdateMessageHandlerTy";
import {TimeoutMessageRTy} from "./TimeoutMessageRTy";
import {TimeoutSetTypesTy} from "./TimeoutSetTypesTy";
import {TimeoutWorkerTypesTy} from "./TimeoutWorkerTypesTy";
import {WorkerReplyTypes} from "./WorkerReplyTypes";
import {TimeoutSetInfo} from "./TimeoutSetInfo";
import {TimeoutClearInfo} from "./TimeoutClearInfo";
import {WorkerUpdateMessageHandler, TimeoutMessageR, TimeoutSetTypes} from "./typed_mod_rebuild_auto";

export class TimeoutWorkerTypes implements TimeoutWorkerTypesTy {
	reply: WorkerReplyTypes = new WorkerReplyTypes;
	update_message_handler: WorkerUpdateMessageHandlerTy = WorkerUpdateMessageHandler;
	ready: TimeoutMessageRTy = TimeoutMessageR;
	set: TimeoutSetInfo = new TimeoutSetInfo;
	clear: TimeoutClearInfo = new TimeoutClearInfo;
	set_types: TimeoutSetTypesTy = TimeoutSetTypes;
}
