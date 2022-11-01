import {TimeoutClearSTy} from "./TimeoutClearSTy"
import {TimeoutClearRTy} from "./TimeoutClearRTy"
import {TimeoutClearATy} from "./TimeoutClearATy"
import {TimeoutClearInfoTy} from "./TimeoutClearInfoTy"
import {TimeoutClearS,TimeoutClearR,TimeoutClearA} from "typescript/src/constants.js"

export class TimeoutClearInfo implements TimeoutClearInfoTy {
	single: TimeoutClearSTy=TimeoutClearS
	repeating: TimeoutClearRTy=TimeoutClearR
	any: TimeoutClearATy=TimeoutClearA
}
