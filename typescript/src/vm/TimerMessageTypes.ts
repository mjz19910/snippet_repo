import {WorkerAsyncMessage} from "../constants.js";
import {ReplyTypes} from "./ReplyTypes.js";
import {ReplyTypesTy} from "./ReplyTypesTy.js";
import {TimeoutFireInfo} from "./TimeoutFireInfo.js";
import {TimeoutFireInfoTy} from "./TimeoutFireInfoTy.js";
import {TimeoutWorkerTypes} from "./TimeoutWorkerTypes.js";
import {TimeoutWorkerTypesTy} from "./TimeoutWorkerTypesTy.js";
import {WorkerAsyncMessageTy} from "./WorkerAsyncMessageTy.js";

export namespace Type {
	export type TimerMessageTypesT={
		async: WorkerAsyncMessageTy;
		reply: ReplyTypes;
		fire: TimeoutFireInfoTy;
		worker: TimeoutWorkerTypesTy;
	};
}

export class TimerMessageTypes implements Type.TimerMessageTypesT {
	async: WorkerAsyncMessageTy=WorkerAsyncMessage;
	reply: ReplyTypesTy=new ReplyTypes;
	fire: TimeoutFireInfoTy=new TimeoutFireInfo;
	worker: TimeoutWorkerTypesTy=new TimeoutWorkerTypes;
}
