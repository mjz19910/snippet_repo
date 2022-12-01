import {ReplyClearSingleTy} from "./ReplyClearSingleTy.js";
import {ReplyClearRepeatingTy} from "./ReplyClearRepeatingTy.js";
import {ReplyClearAnyTy} from "./ReplyClearAnyTy.js";
import {ReplyClearTypes} from "./constant_types.js";
import {ReplyClearAny,ReplyClearRepeating,ReplyClearSingle} from "../constants.js";

export class ReplyClearMessages implements ReplyClearTypes {
	single: ReplyClearSingleTy=ReplyClearSingle;
	repeating: ReplyClearRepeatingTy=ReplyClearRepeating;
	any: ReplyClearAnyTy=ReplyClearAny;
}
