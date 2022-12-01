import {WorkerAsyncMessage} from "../constants.js";
import {TimerMessageTypesT,WorkerAsyncMessageT} from "./constant_types.js";
import {ReplyTypes} from "./ReplyTypes.js";
import {TimeoutFireInfo} from "./TimeoutFireInfo.js";
import {TimeoutWorkerTypes} from "./TimeoutWorkerTypes.js";

export class TimerMessageTypes implements TimerMessageTypesT {
	async: WorkerAsyncMessageT=WorkerAsyncMessage;
	reply=new ReplyTypes;
	fire=new TimeoutFireInfo;
	worker=new TimeoutWorkerTypes;
}
