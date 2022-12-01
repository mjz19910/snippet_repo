import {TimeoutClearSingle,TimeoutClearRepeating,TimeoutClearAny} from "../constants.js"
import {TimeoutClearAnyT, TimeoutClearInfoT, TimeoutClearRepeatingT, TimeoutClearSingleT} from "./constant_types.js";

export class TimeoutClearInfo implements TimeoutClearInfoT {
	single: TimeoutClearSingleT=TimeoutClearSingle
	repeating: TimeoutClearRepeatingT=TimeoutClearRepeating
	any: TimeoutClearAnyT=TimeoutClearAny
}
