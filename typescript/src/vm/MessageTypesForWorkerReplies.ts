import {MessageTimeoutFireS} from "./MessageTimeoutFireS.js";
import {WorkerDestroyTypeMessage} from "./WorkerDestroyTypeMessage.js";
import {ReplyMessage1} from "./ReplyMessage1.js";
import {ReplyMessage2} from "./ReplyMessage2.js";
import {ReplyFromWorkerMessage} from "./MessageReplyFromWorker.js";

export type MessageTypesForWorkerReplies=
	ReplyFromWorkerMessage|
	ReplyMessage2|
	ReplyMessage1|
	WorkerDestroyTypeMessage|
	MessageTimeoutFireS;
