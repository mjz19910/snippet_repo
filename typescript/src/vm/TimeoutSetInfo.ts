import {TimeoutSetSingle,TimeoutSetRepeating} from "./constants.js"
import {TimeoutSetInfoT, TimeoutSetRepeatingT, TimeoutSetSingleT} from "./constant_types.js";

export class TimeoutSetInfo implements TimeoutSetInfoT {
	single: TimeoutSetSingleT=TimeoutSetSingle
	repeating: TimeoutSetRepeatingT=TimeoutSetRepeating
}
