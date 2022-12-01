import {WorkerReplyTypes} from "./WorkerReplyTypes.js";
import {TimeoutSetInfo} from "./TimeoutSetInfo.js";
import {TimeoutClearInfo} from "./TimeoutClearInfo.js";
import {TimeoutMessageReady,TimeoutSetTypes,WorkerUpdateMessageHandler} from "../constants.js";
import {TimeoutClearInfoT,TimeoutMessageReplyT,TimeoutSetInfoT,TimeoutSetTypesT,TimeoutWorkerTypesT,WorkerReplyTypesT,WorkerUpdateMessageHandlerT} from "./constant_types.js";

export class TimeoutWorkerTypes implements TimeoutWorkerTypesT {
	reply: WorkerReplyTypesT=new WorkerReplyTypes;
	update_message_handler: WorkerUpdateMessageHandlerT=WorkerUpdateMessageHandler;
	ready: TimeoutMessageReplyT=TimeoutMessageReady;
	set: TimeoutSetInfoT=new TimeoutSetInfo;
	clear: TimeoutClearInfoT=new TimeoutClearInfo;
	set_types: TimeoutSetTypesT=TimeoutSetTypes;
}
