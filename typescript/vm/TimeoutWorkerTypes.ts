import {WorkerUpdateMessageHandlerTy} from "./WorkerUpdateMessageHandlerTy.js"
import {TimeoutMessageRTy as TimeoutMessageReadyTy} from "./TimeoutMessageRTy"
import {TimeoutSetTypesTy} from "./TimeoutSetTypesTy.js"
import {TimeoutWorkerTypesTy} from "./TimeoutWorkerTypesTy.js"
import {WorkerReplyTypes} from "./WorkerReplyTypes.js"
import {TimeoutSetInfo} from "./TimeoutSetInfo.js"
import {TimeoutClearInfo} from "./TimeoutClearInfo.js"
import {TimeoutMessageR as TimeoutMessageReady,TimeoutSetTypes,WorkerUpdateMessageHandler} from "typescript/src/constants.js"

export class TimeoutWorkerTypes implements TimeoutWorkerTypesTy {
	reply: WorkerReplyTypes=new WorkerReplyTypes
	update_message_handler: WorkerUpdateMessageHandlerTy=WorkerUpdateMessageHandler
	ready: TimeoutMessageReadyTy=TimeoutMessageReady
	set: TimeoutSetInfo=new TimeoutSetInfo
	clear: TimeoutClearInfo=new TimeoutClearInfo
	set_types: TimeoutSetTypesTy=TimeoutSetTypes
}
