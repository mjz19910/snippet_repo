import {ReplyClearAny,ReplyClearRepeating,ReplyClearSingle} from "../constants.js";
import {
	ReplyClearAnyT,
	ReplyClearRepeatingT,
	ReplyClearSingleT,
	ReplyClearTypesT
} from "./constant_types.js";

export class ReplyClearMessages implements ReplyClearTypesT {
	single: ReplyClearSingleT=ReplyClearSingle;
	repeating: ReplyClearRepeatingT=ReplyClearRepeating;
	any: ReplyClearAnyT=ReplyClearAny;
}
