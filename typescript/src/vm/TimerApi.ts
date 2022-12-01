import {
	ReplyClearRepeating,ReplyClearSingle,
	ReplyFromWorker,
	ReplySetRepeating,ReplySetSingle,
	TimeoutClearSingle,
	TimeoutMessageReady,
	TimeoutSetRepeating,TimeoutSetSingle,
	WorkerReadyReply
} from "../constants.js";
import {MakeReplyData} from "./MakeReplyData.js";
import {NoDataMsg} from "./NoDataMsg.js";
import {NumInfoMsg} from "./NumInfoMsg.js";
import {RefVarMsg} from "./RefVarMsg.js";
import {TimeoutClearStrings} from "./TimeoutClearStrings.js";
import {TimeoutSetStrings} from "./TimeoutSetStrings.js";
import {TimerMessageTypes} from "./TimerMessageTypes.js";

export class TimerApi {
	msg_types: TimerMessageTypes=new TimerMessageTypes;
	set_names: TimeoutSetStrings=new TimeoutSetStrings;
	clear_names: TimeoutClearStrings=new TimeoutClearStrings;
	handled: number[]=[];
	to_handle: (NoDataMsg|NumInfoMsg|RefVarMsg)[];
	constructor() {
		this.to_handle=[
			{t: TimeoutMessageReady},
			{t: TimeoutSetSingle},
			{t: TimeoutSetRepeating},
			{t: TimeoutClearSingle},
			new MakeReplyData(ReplyFromWorker,WorkerReadyReply,TimeoutMessageReady,{}),
			// TimeoutSetTypeS
			new MakeReplyData(ReplyFromWorker,ReplySetSingle,{
				var: 'local_id'
			},{}),
			// TimeoutSetTypeR
			new MakeReplyData(ReplyFromWorker,ReplySetRepeating,{
				var: 'local_id'
			},{}),
			// TimeoutClearS
			new MakeReplyData(ReplyFromWorker,ReplyClearSingle,{
				var: 'remote_id'
			},{}),
			// TimeoutClearR
			new MakeReplyData(ReplyFromWorker,ReplyClearRepeating,{
				var: 'remote_id'
			},{})
		];
	}
}
