import {WorkerReadyReplyTy} from "./WorkerReadyReplyTy.js"
import {TimeoutMessageRTy} from "./TimeoutMessageRTy.js"

export type MessageWorkerReadyReply={
	t: WorkerReadyReplyTy
	v: TimeoutMessageRTy
}
