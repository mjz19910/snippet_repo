import {WorkerAsyncMessage} from "../constants.js";
import {ReplyTypes} from "./ReplyTypes.js";
import {ReplyTypesTy} from "./ReplyTypesTy.js";
import {TimeoutFireInfo} from "./TimeoutFireInfo.js";
import {TimeoutFireInfoTy} from "./TimeoutFireInfoTy.js";
import {TimeoutWorkerTypes} from "./TimeoutWorkerTypes.js";
import {TimeoutWorkerTypesTy} from "./TimeoutWorkerTypesTy.js";
import {type Type} from "./TimerMessageTypesTy.js";
import {WorkerAsyncMessageTy} from "./WorkerAsyncMessageTy.js";

type TimerMessageTypes_=Type.TimerMessageTypes;

export class TimerMessageTypes implements TimerMessageTypes_ {
	async: WorkerAsyncMessageTy=WorkerAsyncMessage;
	reply: ReplyTypesTy=new ReplyTypes;
	fire: TimeoutFireInfoTy=new TimeoutFireInfo;
	worker: TimeoutWorkerTypesTy=new TimeoutWorkerTypes;
}
