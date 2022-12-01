import {TimeoutSetStringRepeating,TimeoutSetStringSingle} from "../constants.js"
import {TimeoutSetStringsTy} from "./TimeoutSetStringsTy.js"

export class TimeoutSetStrings implements TimeoutSetStringsTy {
	single: typeof TimeoutSetStringSingle=TimeoutSetStringSingle
	repeating: typeof TimeoutSetStringRepeating=TimeoutSetStringRepeating
}
