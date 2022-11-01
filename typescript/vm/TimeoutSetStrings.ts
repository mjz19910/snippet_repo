import {TimeoutSetStringR,TimeoutSetStringS} from "src/constants.js"
import {TimeoutSetStringsTy} from "./TimeoutSetStringsTy.js"

export class TimeoutSetStrings implements TimeoutSetStringsTy {
	single: typeof TimeoutSetStringS=TimeoutSetStringS
	repeating: typeof TimeoutSetStringR=TimeoutSetStringR
}
