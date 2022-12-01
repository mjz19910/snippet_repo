import {TimeoutSingleReply,TimeoutRepeatingReply} from "../constants.js";
import {TimeoutRepeatingReplyT,TimeoutSingleReplyT,WorkerReplyTimerFireTypesT} from "./constant_types.js";

export class WorkerReplyTimerFireTypes implements WorkerReplyTimerFireTypesT {
	single: TimeoutSingleReplyT=TimeoutSingleReply;
	repeating: TimeoutRepeatingReplyT=TimeoutRepeatingReply;
}
