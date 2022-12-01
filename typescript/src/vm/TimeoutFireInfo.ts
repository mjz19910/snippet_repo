import {TimeoutFireSingleT,TimeoutFireRT,TimeoutFireInfoTy} from "./constant_types.js";
import {TimeoutFireSingle,TimeoutFireRepeating} from "../constants.js"

export class TimeoutFireInfo implements TimeoutFireInfoTy {
	single: TimeoutFireSingleT=TimeoutFireSingle
	repeating: TimeoutFireRT=TimeoutFireRepeating
}
