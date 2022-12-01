import {WorkerReadyReplyTy_OLD} from "./WorkerReadyReplyTy.js"
import {TimeoutMessageReplyTy} from "./TimeoutMessageReplyTy.js"

export type MessageWorkerReadyReply={
	t: WorkerReadyReplyTy_OLD
	v: TimeoutMessageReplyTy
}
