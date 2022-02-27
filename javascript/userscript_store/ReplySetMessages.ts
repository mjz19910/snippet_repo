import {ReplySetSingleTy} from "./ReplySetSingleTy";
import {ReplySetRepeatingTy} from "./ReplySetRepeatingTy";
import {ReplySetTypes} from "./ReplySetTypes";
import {ReplySetSingle, ReplySetRepeating} from "./typed_mod_rebuild_auto";

export class ReplySetMessages implements ReplySetTypes {
	single: ReplySetSingleTy = ReplySetSingle;
	repeating: ReplySetRepeatingTy = ReplySetRepeating;
}
