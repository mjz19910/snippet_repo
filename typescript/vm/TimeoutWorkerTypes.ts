import {WorkerUpdateMessageHandlerTy} from "./WorkerUpdateMessageHandlerTy"
import {TimeoutMessageRTy as TimeoutMessageReadyTy} from "./TimeoutMessageRTy"
import {TimeoutSetTypesTy} from "./TimeoutSetTypesTy"
import {TimeoutWorkerTypesTy} from "./TimeoutWorkerTypesTy"
import {WorkerReplyTypes} from "./WorkerReplyTypes"
import {TimeoutSetInfo} from "./TimeoutSetInfo"
import {TimeoutClearInfo} from "./TimeoutClearInfo"
import {TimeoutMessageR as TimeoutMessageReady,TimeoutSetTypes,WorkerUpdateMessageHandler} from "typescript/src/constants.js"

export class TimeoutWorkerTypes implements TimeoutWorkerTypesTy {
	reply: WorkerReplyTypes=new WorkerReplyTypes
	update_message_handler: WorkerUpdateMessageHandlerTy=WorkerUpdateMessageHandler
	ready: TimeoutMessageReadyTy=TimeoutMessageReady
	set: TimeoutSetInfo=new TimeoutSetInfo
	clear: TimeoutClearInfo=new TimeoutClearInfo
	set_types: TimeoutSetTypesTy=TimeoutSetTypes
}
