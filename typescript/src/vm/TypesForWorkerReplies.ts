import {MessageTimeoutFireS} from "./MessageTimeoutFireS.js";
import {WorkerDestroyTypeMessage} from "./WorkerDestroyTypeMessage.js";
import {ReplyFromWorkerMessage} from "./MessageReplyFromWorker.js";
import {ReplyMessage1, ReplyMessage2} from "./constant_types.js";

export type TypesForWorkerReplies=
	ReplyFromWorkerMessage|
	ReplyMessage1|
	ReplyMessage2|
	WorkerDestroyTypeMessage|
	MessageTimeoutFireS;
