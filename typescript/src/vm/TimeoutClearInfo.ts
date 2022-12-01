import {TimeoutClearSTy} from "./TimeoutClearSTy.js"
import {TimeoutClearRTy} from "./TimeoutClearRTy.js"
import {TimeoutClearATy} from "./TimeoutClearATy.js"
import {TimeoutClearInfoTy} from "./TimeoutClearInfoTy.js"
import {TimeoutClearSingle,TimeoutClearRepeating,TimeoutClearAny} from "../constants.js"

export class TimeoutClearInfo implements TimeoutClearInfoTy {
	single: TimeoutClearSTy=TimeoutClearSingle
	repeating: TimeoutClearRTy=TimeoutClearRepeating
	any: TimeoutClearATy=TimeoutClearAny
}
