import {ReplySetSingleTy} from "./ReplySetSingleTy";
import {ReplySetRepeatingTy} from "./ReplySetRepeatingTy";
import {ReplySetTypes} from "./ReplySetTypes";
import {ReplySetSingle, ReplySetRepeating} from "./rebuild_the_universe_auto_typed_v0.2";

export class ReplySetMessages implements ReplySetTypes {
	single: ReplySetSingleTy = ReplySetSingle;
	repeating: ReplySetRepeatingTy = ReplySetRepeating;
}
