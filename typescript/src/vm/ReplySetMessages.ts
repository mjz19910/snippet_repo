import {ReplySetSingleTy} from "./ReplySetSingleTy.js"
import {ReplySetRepeatingTy} from "./ReplySetRepeatingTy.js"
import {ReplySetTypes} from "./ReplySetTypes.js"
import {ReplySetSingle,ReplySetRepeating} from "constants.js"

export class ReplySetMessages implements ReplySetTypes {
	single: ReplySetSingleTy=ReplySetSingle
	repeating: ReplySetRepeatingTy=ReplySetRepeating
}
