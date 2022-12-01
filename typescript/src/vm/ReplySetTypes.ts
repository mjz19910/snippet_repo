import {ReplySetSingleTy_OLD} from "./ReplySetSingleTy.js"
import {ReplySetRepeatingTy_OLD} from "./ReplySetRepeatingTy.js"
import {ReplySetTypesT_OLD} from "./ReplySetTypesT.js"
import {ReplySetSingle,ReplySetRepeating} from "../constants.js"

export class ReplySetTypes implements ReplySetTypesT_OLD {
	single: ReplySetSingleTy_OLD=ReplySetSingle
	repeating: ReplySetRepeatingTy_OLD=ReplySetRepeating
}
