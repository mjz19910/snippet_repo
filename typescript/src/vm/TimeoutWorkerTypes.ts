import {TimeoutMessageReady,TimeoutSetTypes,WorkerUpdateMessageHandler} from "../constants.js";
import {TimeoutMessageReplyT,TimeoutSetTypesT,TimeoutWorkerTypesT,WorkerUpdateMessageHandlerT} from "./constant_types.js";
import {TimeoutClearInfo} from "./TimeoutClearInfo.js";
import {TimeoutSetInfo} from "./TimeoutSetInfo.js";
import {WorkerReplyTypes} from "./WorkerReplyTypes.js";

export class TimeoutWorkerTypes implements TimeoutWorkerTypesT {
	reply=new WorkerReplyTypes;
	update_message_handler: WorkerUpdateMessageHandlerT=WorkerUpdateMessageHandler;
	ready: TimeoutMessageReplyT=TimeoutMessageReady;
	set=new TimeoutSetInfo;
	clear=new TimeoutClearInfo;
	set_types: TimeoutSetTypesT=TimeoutSetTypes;
}
