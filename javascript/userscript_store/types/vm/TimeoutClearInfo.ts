import {TimeoutClearSTy} from "./TimeoutClearSTy"
import {TimeoutClearRTy} from "./TimeoutClearRTy"
import {TimeoutClearATy} from "./TimeoutClearATy"
import {TimeoutClearInfoTy} from "./TimeoutClearInfoTy"
import {TimeoutClearS,TimeoutClearR,TimeoutClearA} from "types/constants"

export class TimeoutClearInfo implements TimeoutClearInfoTy {
	single: TimeoutClearSTy=TimeoutClearS
	repeating: TimeoutClearRTy=TimeoutClearR
	any: TimeoutClearATy=TimeoutClearA
}
