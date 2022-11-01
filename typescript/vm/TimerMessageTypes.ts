import {WorkerAsyncMessageTy} from "./WorkerAsyncMessageTy.js";
import {TimeoutFireInfoTy} from "./TimeoutFireInfoTy.js";
import {TimeoutWorkerTypesTy} from "./TimeoutWorkerTypesTy.js";
import {TimerMessageTypesTy} from "./TimerMessageTypesTy.js";
import {ReplyTypes} from "./ReplyTypes.js";
import {TimeoutWorkerTypes} from "./TimeoutWorkerTypes.js";
import {TimeoutFireInfo} from "./TimeoutFireInfo.js";
import {ReplyTypesTy} from "./ReplyTypesTy.js";
import {WorkerAsyncMessage} from "src/constants.js";

export class TimerMessageTypes implements TimerMessageTypesTy {
	async: WorkerAsyncMessageTy=WorkerAsyncMessage;
	reply: ReplyTypesTy=new ReplyTypes;
	fire: TimeoutFireInfoTy=new TimeoutFireInfo;
	worker: TimeoutWorkerTypesTy=new TimeoutWorkerTypes;
}
