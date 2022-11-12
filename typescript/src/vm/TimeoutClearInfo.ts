import {TimeoutClearSTy} from "./TimeoutClearSTy.js"
import {TimeoutClearRTy} from "./TimeoutClearRTy.js"
import {TimeoutClearATy} from "./TimeoutClearATy.js"
import {TimeoutClearInfoTy} from "./TimeoutClearInfoTy.js"
import {TimeoutClearS,TimeoutClearR,TimeoutClearA} from "src/constants.js"

export class TimeoutClearInfo implements TimeoutClearInfoTy {
	single: TimeoutClearSTy=TimeoutClearS
	repeating: TimeoutClearRTy=TimeoutClearR
	any: TimeoutClearATy=TimeoutClearA
}
