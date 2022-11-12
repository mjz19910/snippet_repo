import {WorkerAsyncMessageTy} from "./WorkerAsyncMessageTy.js"
import {TimeoutFireInfoTy} from "./TimeoutFireInfoTy.js"
import {TimeoutWorkerTypesTy} from "./TimeoutWorkerTypesTy.js"
import {ReplyTypes} from "./ReplyTypes.js"

export type TimerMessageTypesTy={
	async: WorkerAsyncMessageTy
	reply: ReplyTypes
	fire: TimeoutFireInfoTy
	worker: TimeoutWorkerTypesTy
}
