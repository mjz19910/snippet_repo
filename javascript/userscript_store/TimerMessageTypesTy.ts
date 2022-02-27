import {WorkerAsyncMessageTy} from "./WorkerAsyncMessageTy";
import {TimeoutFireInfoTy} from "./TimeoutFireInfoTy";
import {TimeoutWorkerTypesTy} from "./TimeoutWorkerTypesTy";
import {ReplyTypes} from "./rebuild_the_universe_auto_typed_v0.2";

export type TimerMessageTypesTy = {
	async: WorkerAsyncMessageTy;
	reply: ReplyTypes;
	fire: TimeoutFireInfoTy;
	worker: TimeoutWorkerTypesTy;
};
