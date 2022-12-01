import {ReplySetSingleTy_OLD} from "./ReplySetSingleTy.js"
import {ReplySetRepeatingTy_OLD} from "./ReplySetRepeatingTy.js"
import {ReplySetTypesT as ReplySetTypesT} from "./ReplySetTypesT.js"
import {ReplySetSingle,ReplySetRepeating} from "../constants.js"

export class ReplySetTypes implements ReplySetTypesT {
	single: ReplySetSingleTy_OLD=ReplySetSingle
	repeating: ReplySetRepeatingTy_OLD=ReplySetRepeating
}
