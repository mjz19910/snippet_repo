import {TimeoutFireRepeating,TimeoutFireSingle} from "../constants.js";
import {ReplyClearMessages} from "./ReplyClearMessages.js";
import {ReplyFromWorkerTy} from "./ReplyFromWorkerTy.js";
import {ReplyMessage1Ty} from "./ReplyMessage1Ty.js";
import {ReplyMessage2Ty} from "./ReplyMessage2Ty.js";
import {ReplySetMessages} from "./ReplySetMessages.js";
import {ReplyToWorkerTy} from "./ReplyToWorkerTy.js";
import {TimeoutWorkerTypesTy} from "./TimeoutWorkerTypesTy.js";
import {WorkerAsyncMessageTy} from "./WorkerAsyncMessageTy.js";
import {WorkerDestroyTypeT} from "./WorkerDestroyTypeT.js";
import {WorkerReadyReplyTy} from "./WorkerReadyReplyTy.js";
import {WorkerUpdateMessageHandlerReplyTy} from "./WorkerUpdateMessageHandlerReplyTy.js";

export type TimeoutFireSingleT=typeof TimeoutFireSingle;
export type TimeoutFireRT=typeof TimeoutFireRepeating;
export type TimeoutFireInfoT={
	single: TimeoutFireSingleT;
	repeating: TimeoutFireRT;
};
export type ReplyTypesT={
	msg1: ReplyMessage1Ty;
	msg2: ReplyMessage2Ty;
	from_worker: ReplyFromWorkerTy;
	to_worker: ReplyToWorkerTy;
	destroy_worker: WorkerDestroyTypeT;
	update_handler: WorkerUpdateMessageHandlerReplyTy;
	ready: WorkerReadyReplyTy;
	set: ReplySetMessages;
	clear: ReplyClearMessages;
};
export type TimerMessageTypesT={
	async: WorkerAsyncMessageTy;
	reply: ReplyTypesT;
	fire: TimeoutFireInfoT;
	worker: TimeoutWorkerTypesTy;
};
