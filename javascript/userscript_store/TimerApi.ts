import {TimerMessageTypes, TimeoutSetStrings, TimeoutClearStrings, NoDataMsg, NumInfoMsg, RefVarMsg, TimeoutMessageR, TimeoutSetS, TimeoutSetR, TimeoutClearS, MakeReplyData, ReplyFromWorker, WorkerReadyReply, ReplySetSingle, ReplySetRepeating, ReplyClearSingle, ReplyClearRepeating} from "./rebuild_the_universe_auto_typed_v0.2";

export class TimerApi {
	msg_types = new TimerMessageTypes;
	set_names = new TimeoutSetStrings;
	clear_names = new TimeoutClearStrings;
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
