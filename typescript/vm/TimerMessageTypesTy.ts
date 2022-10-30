import {WorkerAsyncMessageTy} from "./WorkerAsyncMessageTy"
import {TimeoutFireInfoTy} from "./TimeoutFireInfoTy"
import {TimeoutWorkerTypesTy} from "./TimeoutWorkerTypesTy"
import {ReplyTypes} from "./ReplyTypes"

export type TimerMessageTypesTy={
	async: WorkerAsyncMessageTy
	reply: ReplyTypes
	fire: TimeoutFireInfoTy
	worker: TimeoutWorkerTypesTy
}
