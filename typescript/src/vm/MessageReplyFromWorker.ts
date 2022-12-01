import {ReplyFromWorkerT} from "./constant_types.js";
import {MessageReplyFromWorkerData} from "./MessageReplyFromWorkerData.js"

export type ReplyFromWorkerMessage={
	t: ReplyFromWorkerT
	v: MessageReplyFromWorkerData
}
