import {TimeoutSetStringRepeating,TimeoutSetStringSingle} from "../constants.js"
import {TimeoutSetStringsT} from "./constant_types.js";

export class TimeoutSetStrings implements TimeoutSetStringsT {
	single: typeof TimeoutSetStringSingle=TimeoutSetStringSingle
	repeating: typeof TimeoutSetStringRepeating=TimeoutSetStringRepeating
}
