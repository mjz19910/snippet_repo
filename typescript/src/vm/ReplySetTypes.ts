import {ReplySetSingleTy} from "./ReplySetSingleTy.js"
import {ReplySetRepeatingTy} from "./ReplySetRepeatingTy.js"
import {ReplySetTypesT as ReplySetTypesT} from "./ReplySetTypesT.js"
import {ReplySetSingle,ReplySetRepeating} from "../constants.js"

export class ReplySetTypes implements ReplySetTypesT {
	single: ReplySetSingleTy=ReplySetSingle
	repeating: ReplySetRepeatingTy=ReplySetRepeating
}
