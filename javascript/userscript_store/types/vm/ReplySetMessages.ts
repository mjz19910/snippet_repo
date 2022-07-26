import {ReplySetSingleTy} from "./ReplySetSingleTy"
import {ReplySetRepeatingTy} from "./ReplySetRepeatingTy"
import {ReplySetTypes} from "./ReplySetTypes"
import {ReplySetSingle,ReplySetRepeating} from "types/constants"

export class ReplySetMessages implements ReplySetTypes {
	single: ReplySetSingleTy=ReplySetSingle
	repeating: ReplySetRepeatingTy=ReplySetRepeating
}
