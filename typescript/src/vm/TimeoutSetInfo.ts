import {TimeoutSetSTy} from "./TimeoutSetSTy.js"
import {TimeoutSetRTy} from "./TimeoutSetRTy.js"
import {TimeoutSetInfoTy} from "./TimeoutSetInfoTy.js"
import {TimeoutSetS,TimeoutSetR} from "constants.js"

export class TimeoutSetInfo implements TimeoutSetInfoTy {
	single: TimeoutSetSTy=TimeoutSetS
	repeating: TimeoutSetRTy=TimeoutSetR
}
