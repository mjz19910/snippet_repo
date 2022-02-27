import {WorkerUpdateMessageHandlerReplyTy} from "./WorkerUpdateMessageHandlerReplyTy";
import {WorkerUpdateMessageHandlerTy} from "./WorkerUpdateMessageHandlerTy";

export type MessageWorkerUpdateMessageHandlerReply = {
	t: WorkerUpdateMessageHandlerReplyTy;
	v: WorkerUpdateMessageHandlerTy;
};
