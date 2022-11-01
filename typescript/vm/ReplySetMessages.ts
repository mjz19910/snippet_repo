import {ReplySetSingleTy} from "./ReplySetSingleTy"
import {ReplySetRepeatingTy} from "./ReplySetRepeatingTy"
import {ReplySetTypes} from "./ReplySetTypes"
import {ReplySetSingle,ReplySetRepeating} from "typescript/src/constants.js"

export class ReplySetMessages implements ReplySetTypes {
	single: ReplySetSingleTy=ReplySetSingle
	repeating: ReplySetRepeatingTy=ReplySetRepeating
}
