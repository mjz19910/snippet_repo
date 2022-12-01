import {ReplyClearAny,ReplyClearRepeating,ReplyClearSingle} from "../constants.js";
import {
	ReplyClearAnyTy,
	ReplyClearRepeatingTy,
	ReplyClearSingleTy,
	ReplyClearTypesT
} from "./constant_types.js";

export class ReplyClearMessages implements ReplyClearTypesT {
	single: ReplyClearSingleTy=ReplyClearSingle;
	repeating: ReplyClearRepeatingTy=ReplyClearRepeating;
	any: ReplyClearAnyTy=ReplyClearAny;
}
