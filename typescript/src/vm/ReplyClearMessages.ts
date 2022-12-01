import {ReplyClearAny,ReplyClearRepeating,ReplyClearSingle} from "../constants.js";
import {
	ReplyClearAnyTy,
	ReplyClearRepeatingTy,
	ReplyClearTypesT,
} from "./constant_types.js";
import {ReplyClearSingleTy} from "./ReplyClearSingleTy.js";

export class ReplyClearMessages implements ReplyClearTypesT {
	single: ReplyClearSingleTy=ReplyClearSingle;
	repeating: ReplyClearRepeatingTy=ReplyClearRepeating;
	any: ReplyClearAnyTy=ReplyClearAny;
}
