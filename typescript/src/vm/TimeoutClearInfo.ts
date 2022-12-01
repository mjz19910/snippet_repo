import {TimeoutClearSTy_OLD} from "./TimeoutClearSTy.js"
import {TimeoutClearRTy_OLD} from "./TimeoutClearRTy.js"
import {TimeoutClearATy_OLD} from "./TimeoutClearATy.js"
import {TimeoutClearInfoTy_OLD} from "./TimeoutClearInfoTy.js"
import {TimeoutClearSingle,TimeoutClearRepeating,TimeoutClearAny} from "../constants.js"

export class TimeoutClearInfo implements TimeoutClearInfoTy_OLD {
	single: TimeoutClearSTy_OLD=TimeoutClearSingle
	repeating: TimeoutClearRTy_OLD=TimeoutClearRepeating
	any: TimeoutClearATy_OLD=TimeoutClearAny
}
