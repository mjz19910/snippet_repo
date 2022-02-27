import {ReplyClearSingleTy} from "./ReplyClearSingleTy";
import {ReplyClearRepeatingTy} from "./ReplyClearRepeatingTy";
import {ReplyClearAnyTy} from "./ReplyClearAnyTy";
import {ReplyClearTypes} from "./ReplyClearTypes";
import {ReplyClearSingle, ReplyClearRepeating, ReplyClearAny} from "./rebuild_the_universe_auto_typed_v0.2";

export class ReplyClearMessages implements ReplyClearTypes {
	single: ReplyClearSingleTy = ReplyClearSingle;
	repeating: ReplyClearRepeatingTy = ReplyClearRepeating;
	any: ReplyClearAnyTy = ReplyClearAny;
}
