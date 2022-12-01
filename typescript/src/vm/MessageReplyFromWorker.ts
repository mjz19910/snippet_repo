import {MessageReplyFromWorkerData} from "./MessageReplyFromWorkerData.js"
import {ReplyFromWorkerTy} from "./ReplyFromWorkerTy.js"

export type ReplyFromWorkerMessage={
	t: ReplyFromWorkerTy
	v: MessageReplyFromWorkerData
}
