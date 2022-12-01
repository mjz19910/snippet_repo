import {ReplySetSingle,ReplySetRepeating} from "./constants.js";
import {ReplySetRepeatingT,ReplySetSingleT,ReplySetTypesT} from "./constant_types.js";

export class ReplySetTypes implements ReplySetTypesT {
	single: ReplySetSingleT=ReplySetSingle;
	repeating: ReplySetRepeatingT=ReplySetRepeating;
}
