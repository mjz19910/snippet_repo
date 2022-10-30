import {TimeoutClearStringR,TimeoutClearStringS} from "typescript/constants"
import {TimeoutClearStringsTy} from "./TimeoutClearStringsTy"

export class TimeoutClearStrings implements TimeoutClearStringsTy {
	single: typeof TimeoutClearStringS=TimeoutClearStringS
	repeating: typeof TimeoutClearStringR=TimeoutClearStringR
}
