import {ReplyClearSingleTy} from "./ReplyClearSingleTy"
import {ReplyClearRepeatingTy} from "./ReplyClearRepeatingTy"
import {ReplyClearAnyTy} from "./ReplyClearAnyTy"
import {ReplyClearTypes} from "./ReplyClearTypes"
import {ReplyClearAny,ReplyClearRepeating,ReplyClearSingle} from "types/constants"
export class ReplyClearMessages implements ReplyClearTypes {
	single: ReplyClearSingleTy=ReplyClearSingle
	repeating: ReplyClearRepeatingTy=ReplyClearRepeating
	any: ReplyClearAnyTy=ReplyClearAny
}
