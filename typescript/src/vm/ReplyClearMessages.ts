import {ReplyClearAny,ReplyClearRepeating,ReplyClearSingle} from "../constants.js";
import {
	ReplyClearAnyTy,
	ReplyClearRepeatingTy,
	ReplyClearTypes,
} from "./constant_types.js";
import {ReplyClearSingleTy} from "./ReplyClearSingleTy.js";

export class ReplyClearMessages implements ReplyClearTypes {
	single: ReplyClearSingleTy=ReplyClearSingle;
	repeating: ReplyClearRepeatingTy=ReplyClearRepeating;
	any: ReplyClearAnyTy=ReplyClearAny;
}
