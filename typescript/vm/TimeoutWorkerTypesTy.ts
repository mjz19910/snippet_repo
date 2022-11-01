import {WorkerUpdateMessageHandlerTy} from "./WorkerUpdateMessageHandlerTy.js"
import {TimeoutMessageRTy} from "./TimeoutMessageRTy.js"
import {TimeoutSetTypesTy} from "./TimeoutSetTypesTy.js"
import {TimeoutSetInfoTy} from "./TimeoutSetInfoTy.js"
import {TimeoutClearInfoTy} from "./TimeoutClearInfoTy.js"
import {WorkerReplyTypes} from "./WorkerReplyTypes.js"

export type TimeoutWorkerTypesTy={
	reply: WorkerReplyTypes
	update_message_handler: WorkerUpdateMessageHandlerTy
	ready: TimeoutMessageRTy
	set: TimeoutSetInfoTy
	clear: TimeoutClearInfoTy
	set_types: TimeoutSetTypesTy
}
