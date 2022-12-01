import {WorkerUpdateMessageHandlerTy_OLD} from "./WorkerUpdateMessageHandlerTy.js"
import {TimeoutSetTypesTy} from "./TimeoutSetTypesTy.js"
import {TimeoutWorkerTypesTy_OLD} from "./TimeoutWorkerTypesTy.js"
import {WorkerReplyTypes} from "./WorkerReplyTypes.js"
import {TimeoutSetInfo} from "./TimeoutSetInfo.js"
import {TimeoutClearInfo} from "./TimeoutClearInfo.js"
import {TimeoutMessageReady,TimeoutSetTypes,WorkerUpdateMessageHandler} from "../constants.js"
import {TimeoutMessageReplyTy} from "./TimeoutMessageReplyTy.js";

export class TimeoutWorkerTypes implements TimeoutWorkerTypesTy_OLD {
	reply: WorkerReplyTypes=new WorkerReplyTypes
	update_message_handler: WorkerUpdateMessageHandlerTy_OLD=WorkerUpdateMessageHandler
	ready: TimeoutMessageReplyTy=TimeoutMessageReady
	set: TimeoutSetInfo=new TimeoutSetInfo
	clear: TimeoutClearInfo=new TimeoutClearInfo
	set_types: TimeoutSetTypesTy=TimeoutSetTypes
}
