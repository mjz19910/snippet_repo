import {TimeoutFireSingleT,TimeoutFireRT,TimeoutFireInfoT} from "./constant_types.js";
import {TimeoutFireSingle,TimeoutFireRepeating} from "../constants.js"

export class TimeoutFireInfo implements TimeoutFireInfoT {
	single: TimeoutFireSingleT=TimeoutFireSingle
	repeating: TimeoutFireRT=TimeoutFireRepeating
}
