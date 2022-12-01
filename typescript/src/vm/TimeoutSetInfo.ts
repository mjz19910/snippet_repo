import {TimeoutSetSTy} from "./TimeoutSetSTy.js"
import {TimeoutSetRTy} from "./TimeoutSetRTy.js"
import {TimeoutSetInfoTy} from "./TimeoutSetInfoTy.js"
import {TimeoutSetSingle,TimeoutSetRepeating} from "../constants.js"

export class TimeoutSetInfo implements TimeoutSetInfoTy {
	single: TimeoutSetSTy=TimeoutSetSingle
	repeating: TimeoutSetRTy=TimeoutSetRepeating
}
