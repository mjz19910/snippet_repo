import {TimeoutSetSTy} from "./TimeoutSetSTy"
import {TimeoutSetRTy} from "./TimeoutSetRTy"
import {TimeoutSetInfoTy} from "./TimeoutSetInfoTy"
import {TimeoutSetS,TimeoutSetR} from "typescript/src/constants.js"

export class TimeoutSetInfo implements TimeoutSetInfoTy {
	single: TimeoutSetSTy=TimeoutSetS
	repeating: TimeoutSetRTy=TimeoutSetR
}
