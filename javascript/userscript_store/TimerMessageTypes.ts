import {WorkerAsyncMessageTy} from "./WorkerAsyncMessageTy";
import {TimeoutFireInfoTy} from "./TimeoutFireInfoTy";
import {TimeoutWorkerTypesTy} from "./TimeoutWorkerTypesTy";
import {TimerMessageTypesTy} from "./TimerMessageTypesTy";
import {ReplyTypes} from "./ReplyTypes";
import {TimeoutWorkerTypes} from "./TimeoutWorkerTypes";
import {TimeoutFireInfo} from "./TimeoutFireInfo";
import {ReplyTypesTy} from "./ReplyTypesTy";
import {WorkerAsyncMessage} from "./typed_mod_rebuild_auto";

export class TimerMessageTypes implements TimerMessageTypesTy {
	async: WorkerAsyncMessageTy = WorkerAsyncMessage;
	reply: ReplyTypesTy = new ReplyTypes;
	fire: TimeoutFireInfoTy = new TimeoutFireInfo;
	worker: TimeoutWorkerTypesTy = new TimeoutWorkerTypes;
}
