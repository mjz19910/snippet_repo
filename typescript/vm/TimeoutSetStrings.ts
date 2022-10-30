import {TimeoutSetStringR,TimeoutSetStringS} from "typescript/constants"
import {TimeoutSetStringsTy} from "./TimeoutSetStringsTy"

export class TimeoutSetStrings implements TimeoutSetStringsTy {
	single: typeof TimeoutSetStringS=TimeoutSetStringS
	repeating: typeof TimeoutSetStringR=TimeoutSetStringR
}
