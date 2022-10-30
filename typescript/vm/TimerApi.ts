import {ReplyClearRepeating,ReplyClearSingle,ReplyFromWorker,ReplySetRepeating,ReplySetSingle,TimeoutClearS,TimeoutMessageR,TimeoutSetR,TimeoutSetS,WorkerReadyReply} from "typescript/constants"
import {MakeReplyData} from "./MakeReplyData"
import {NoDataMsg} from "./NoDataMsg"
import {NumInfoMsg} from "./NumInfoMsg"
import {RefVarMsg} from "./RefVarMsg"
import {TimeoutClearStrings} from "./TimeoutClearStrings"
import {TimeoutSetStrings} from "./TimeoutSetStrings"
import {TimerMessageTypes} from "./TimerMessageTypes"

export class TimerApi {
	msg_types: TimerMessageTypes=new TimerMessageTypes
	set_names: TimeoutSetStrings=new TimeoutSetStrings
	clear_names: TimeoutClearStrings=new TimeoutClearStrings
	handled: number[]=[]
	to_handle: (NoDataMsg|NumInfoMsg|RefVarMsg)[]
	constructor() {
		this.to_handle=[
			{t: TimeoutMessageR},
			{t: TimeoutSetS},
			{t: TimeoutSetR},
			{t: TimeoutClearS},
			new MakeReplyData(ReplyFromWorker,WorkerReadyReply,TimeoutMessageR,{}),
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
		]
	}
}
