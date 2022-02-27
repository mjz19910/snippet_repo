import {WorkerReadyReplyTy, TimeoutMessageRTy} from "./rebuild_the_universe_auto_typed_v0.2";

export type MessageWorkerReadyReply = {
	t: WorkerReadyReplyTy;
	v: TimeoutMessageRTy;
};
