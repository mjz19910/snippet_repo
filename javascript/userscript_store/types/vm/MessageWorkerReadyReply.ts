import {WorkerReadyReplyTy} from "./WorkerReadyReplyTy"
import {TimeoutMessageRTy} from "./TimeoutMessageRTy"

export type MessageWorkerReadyReply = {
	t: WorkerReadyReplyTy
	v: TimeoutMessageRTy
}
