import {WorkerAsyncMessage} from "../constants.js";
import {ReplyTypes} from "./ReplyTypes.js";
import {ReplyTypesT, TimerMessageTypesT} from "./constant_types.js";
import {TimeoutFireInfo} from "./TimeoutFireInfo.js";
import {TimeoutFireInfoTy} from "./TimeoutFireInfoTy.js";
import {TimeoutWorkerTypes} from "./TimeoutWorkerTypes.js";
import {TimeoutWorkerTypesTy} from "./TimeoutWorkerTypesTy.js";
import {WorkerAsyncMessageTy} from "./WorkerAsyncMessageTy.js";

export class TimerMessageTypes implements TimerMessageTypesT {
	async: WorkerAsyncMessageTy=WorkerAsyncMessage;
	reply: ReplyTypesT=new ReplyTypes;
	fire: TimeoutFireInfoTy=new TimeoutFireInfo;
	worker: TimeoutWorkerTypesTy=new TimeoutWorkerTypes;
}
