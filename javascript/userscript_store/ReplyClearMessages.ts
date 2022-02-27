import {ReplyClearSingleTy} from "./ReplyClearSingleTy";
import {ReplyClearRepeatingTy} from "./ReplyClearRepeatingTy";
import {ReplyClearAnyTy} from "./ReplyClearAnyTy";
import {ReplyClearTypes} from "./ReplyClearTypes";
import {ReplyClearSingle, ReplyClearRepeating, ReplyClearAny} from "./typed_mod_rebuild_auto";

export class ReplyClearMessages implements ReplyClearTypes {
	single: ReplyClearSingleTy = ReplyClearSingle;
	repeating: ReplyClearRepeatingTy = ReplyClearRepeating;
	any: ReplyClearAnyTy = ReplyClearAny;
}
