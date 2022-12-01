import {WorkerUpdateMessageHandlerTy_OLD} from "./WorkerUpdateMessageHandlerTy.js"
import {TimeoutMessageReplyTy} from "./TimeoutMessageReplyTy.js"
import {TimeoutSetTypesTy} from "./TimeoutSetTypesTy.js"
import {TimeoutSetInfoTy} from "./TimeoutSetInfoTy.js"
import {TimeoutClearInfoTy_OLD} from "./TimeoutClearInfoTy.js"
import {WorkerReplyTypes} from "./WorkerReplyTypes.js"

export type TimeoutWorkerTypesTy_OLD={
	reply: WorkerReplyTypes
	update_message_handler: WorkerUpdateMessageHandlerTy_OLD
	ready: TimeoutMessageReplyTy
	set: TimeoutSetInfoTy
	clear: TimeoutClearInfoTy_OLD
	set_types: TimeoutSetTypesTy
}
