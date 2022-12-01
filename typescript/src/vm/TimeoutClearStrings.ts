import {TimeoutClearStringRepeating,TimeoutClearStringSingle} from "../constants.js"
import {TimeoutClearStringsTy_OLD} from "./TimeoutClearStringsTy.js"

export class TimeoutClearStrings implements TimeoutClearStringsTy_OLD {
	single: typeof TimeoutClearStringSingle=TimeoutClearStringSingle
	repeating: typeof TimeoutClearStringRepeating=TimeoutClearStringRepeating
}
