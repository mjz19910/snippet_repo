import {MakeReplyData, NoDataMsg, NumInfoMsg, RefVarMsg, ReplyClearRepeating, ReplyClearSingle, ReplyFromWorker, ReplySetRepeating, ReplySetSingle, TimeoutClearS, TimeoutClearStrings, TimeoutMessageR, TimeoutSetR, TimeoutSetS, TimeoutSetStrings, TimerMessageTypes, WorkerReadyReply} from "rebuild_the_universe_auto_typed_v0.2";

export class TimerApi {
	msg_types:TimerMessageTypes = new TimerMessageTypes;
	set_names:TimeoutSetStrings = new TimeoutSetStrings;
	clear_names:TimeoutClearStrings = new TimeoutClearStrings;
	handled: number[] = [];
	to_handle: (NoDataMsg | NumInfoMsg | RefVarMsg)[];
	constructor() {
		this.to_handle = [
			{t: TimeoutMessageR},
			{t: TimeoutSetS},
			{t: TimeoutSetR},
			{t: TimeoutClearS},
			new MakeReplyData(ReplyFromWorker, WorkerReadyReply, TimeoutMessageR, {}),
			// TimeoutSetTypeS
			new MakeReplyData(ReplyFromWorker, ReplySetSingle, {
				var: 'local_id'
			}, {}),
			// TimeoutSetTypeR
			new MakeReplyData(ReplyFromWorker, ReplySetRepeating, {
				var: 'local_id'
			}, {}),
			// TimeoutClearS
			new MakeReplyData(ReplyFromWorker, ReplyClearSingle, {
				var: 'remote_id'
			}, {}),
			// TimeoutClearR
			new MakeReplyData(ReplyFromWorker, ReplyClearRepeating, {
				var: 'remote_id'
			}, {})
		];
	}
}
