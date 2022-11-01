import {TimeoutClearStringR,TimeoutClearStringS} from "typescript/src/constants.js"
import {TimeoutClearStringsTy} from "./TimeoutClearStringsTy.js"

export class TimeoutClearStrings implements TimeoutClearStringsTy {
	single: typeof TimeoutClearStringS=TimeoutClearStringS
	repeating: typeof TimeoutClearStringR=TimeoutClearStringR
}
