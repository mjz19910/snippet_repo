import {TimeoutSingleReplyTy} from "./TimeoutSingleReplyTy";
import {TimeoutRepeatingReplyTy} from "./TimeoutRepeatingReplyTy";
import {WorkerReplyTypesTy} from "./WorkerReplyTypesTy";
import {TimeoutSingleReply, TimeoutRepeatingReply} from "./rebuild_the_universe_auto_typed_v0.2";

export class WorkerFireReplyTypes implements WorkerReplyTypesTy {
	single: TimeoutSingleReplyTy = TimeoutSingleReply;
	repeating: TimeoutRepeatingReplyTy = TimeoutRepeatingReply;
}
