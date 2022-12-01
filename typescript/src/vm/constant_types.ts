import {TimeoutFireRepeating,TimeoutFireSingle, WorkerAsyncMessage} from "../constants.js";
import {ReplyClearMessages} from "./ReplyClearMessages.js";
import {ReplyFromWorkerTy} from "./ReplyFromWorkerTy.js";
import {ReplyMessage1Ty} from "./ReplyMessage1Ty.js";
import {ReplyMessage2Ty} from "./ReplyMessage2Ty.js";
import {ReplySetMessages} from "./ReplySetMessages.js";
import {ReplyToWorkerTy} from "./ReplyToWorkerTy.js";
import {TimeoutClearInfoTy} from "./TimeoutClearInfoTy.js";
import {TimeoutMessageReplyTy} from "./TimeoutMessageReplyTy.js";
import {TimeoutSetInfoTy} from "./TimeoutSetInfoTy.js";
import {TimeoutSetTypesTy} from "./TimeoutSetTypesTy.js";
import {WorkerDestroyTypeT} from "./WorkerDestroyTypeT.js";
import {WorkerReadyReplyTy} from "./WorkerReadyReplyTy.js";
import {WorkerReplyTypes} from "./WorkerReplyTypes.js";
import {WorkerUpdateMessageHandlerReplyTy} from "./WorkerUpdateMessageHandlerReplyTy.js";
import {WorkerUpdateMessageHandlerTy} from "./WorkerUpdateMessageHandlerTy.js";

export type TimeoutFireSingleT=typeof TimeoutFireSingle;
export type TimeoutFireRepeatingT=typeof TimeoutFireRepeating;
export type TimeoutFireInfoT={
	single: TimeoutFireSingleT;
	repeating: TimeoutFireRepeatingT;
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
export type TimeoutWorkerTypesT={
	reply: WorkerReplyTypes
	update_message_handler: WorkerUpdateMessageHandlerTy
	ready: TimeoutMessageReplyTy
	set: TimeoutSetInfoTy
	clear: TimeoutClearInfoTy
	set_types: TimeoutSetTypesTy
}
export type WorkerAsyncMessageT=typeof WorkerAsyncMessage;
export type TimerMessageTypesT={
	async: WorkerAsyncMessageT;
	reply: ReplyTypesT;
	fire: TimeoutFireInfoT;
	worker: TimeoutWorkerTypesT;
};
