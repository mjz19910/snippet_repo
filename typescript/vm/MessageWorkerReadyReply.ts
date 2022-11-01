import {WorkerReadyReplyTy} from "./WorkerReadyReplyTy.js"
import {TimeoutMessageReplyTy} from "./TimeoutMessageReplyTy.js"

export type MessageWorkerReadyReply={
	t: WorkerReadyReplyTy
	v: TimeoutMessageReplyTy
}
