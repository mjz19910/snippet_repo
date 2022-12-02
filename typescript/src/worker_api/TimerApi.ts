import {
	ReplyClearRepeating,
	ReplyClearSingle,
	ReplyFromWorker,
	ReplySetRepeating,
	ReplySetSingle,
	TimeoutClearSingle,
	TimeoutMessageReady,
	TimeoutSetRepeating,
	TimeoutSetSingle,
	WorkerReadyReply
} from "./constants.js";
import {
	TimeoutClearStrings,
	TimeoutSetStrings,
	TimerMessageTypes,
} from "./interfaces.js";
import {MakeReplyData} from "./MakeReplyData.js";
import {MakeReplyDataType} from "./MakeReplyDataType.js";

export class TimerApi {
	msg_types=new TimerMessageTypes;
	set_names=new TimeoutSetStrings;
	clear_names=new TimeoutClearStrings;
	handled: number[]=[];
	to_handle: ({t: number;}|{t: number; v: MakeReplyDataType;})[];
	constructor() {
		this.to_handle=[
			{t: TimeoutMessageReady},
			{t: TimeoutSetSingle},
			{t: TimeoutSetRepeating},
			{t: TimeoutClearSingle},
			new MakeReplyData(ReplyFromWorker,WorkerReadyReply,TimeoutMessageReady),
			// TimeoutSetTypeS
			new MakeReplyData(ReplyFromWorker,ReplySetSingle,{
				var: 'local_id'
			}),
			// TimeoutSetTypeR
			new MakeReplyData(ReplyFromWorker,ReplySetRepeating,{
				var: 'local_id'
			}),
			// TimeoutClearS
			new MakeReplyData(ReplyFromWorker,ReplyClearSingle,{
				var: 'remote_id'
			}),
			// TimeoutClearR
			new MakeReplyData(ReplyFromWorker,ReplyClearRepeating,{
				var: 'remote_id'
			})
		];
	}
}
