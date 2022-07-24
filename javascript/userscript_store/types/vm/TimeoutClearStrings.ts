import {TimeoutClearStringR, TimeoutClearStringS} from "types/constants"
import {TimeoutClearStringsTy} from "./TimeoutClearStringsTy"

export class TimeoutClearStrings implements TimeoutClearStringsTy {
	single: typeof TimeoutClearStringS = TimeoutClearStringS
	repeating: typeof TimeoutClearStringR = TimeoutClearStringR
}
