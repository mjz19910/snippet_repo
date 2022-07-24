import {TimeoutSetSTy} from "./TimeoutSetSTy"
import {TimeoutSetRTy} from "./TimeoutSetRTy"
import {TimeoutSetInfoTy} from "./TimeoutSetInfoTy"
import {TimeoutSetS, TimeoutSetR} from "types/constants"

export class TimeoutSetInfo implements TimeoutSetInfoTy {
	single: TimeoutSetSTy = TimeoutSetS
	repeating: TimeoutSetRTy = TimeoutSetR
}
