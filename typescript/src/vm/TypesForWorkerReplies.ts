import {MessageTimeoutFireS} from "./MessageTimeoutFireS.js";
import {WorkerDestroyTypeMessage} from "./WorkerDestroyTypeMessage.js";
import {ReplyFromWorkerMessage} from "./MessageReplyFromWorker.js";
import {ReplyToLocalTimerT, ReplyToWorkerStateT} from "./constant_types.js";

export type TypesForWorkerReplies=
	ReplyFromWorkerMessage|
	ReplyToLocalTimerT|
	ReplyToWorkerStateT|
	WorkerDestroyTypeMessage|
	MessageTimeoutFireS;
