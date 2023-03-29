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

export class TimerApi {
	msg_types=new TimerMessageTypes;
	set_names=new TimeoutSetStrings;
	clear_names=new TimeoutClearStrings;
	handled: number[]=[];
	to_handle: ([number]|[number,number,number]|[number,number,{var: "local_id";}]|[number,number,{var: "remote_id";}])[];
	constructor() {
		this.to_handle=[
			[TimeoutMessageReady],
			[TimeoutSetSingle],
			[TimeoutSetRepeating],
			[TimeoutClearSingle],
			[ReplyFromWorker,WorkerReadyReply,TimeoutMessageReady],
			// TimeoutSetTypeS
			[ReplyFromWorker,ReplySetSingle,{
				var: 'local_id'
			}],
			// TimeoutSetTypeR
			[ReplyFromWorker,ReplySetRepeating,{
				var: 'local_id'
			}],
			// TimeoutClearS
			[ReplyFromWorker,ReplyClearSingle,{
				var: 'remote_id'
			}],
			// TimeoutClearR
			[ReplyFromWorker,ReplyClearRepeating,{
				var: 'remote_id'
			}]
		];
	}
}
