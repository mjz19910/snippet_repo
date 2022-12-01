import {TimeoutFireSTy} from "./TimeoutFireSTy.js"
import {TimeoutFireRTy} from "./TimeoutFireRTy.js"
import {TimeoutFireInfoTy} from "./TimeoutFireInfoTy.js"
import {TimeoutFireSingle,TimeoutFireRepeating} from "../constants.js"

export class TimeoutFireInfo implements TimeoutFireInfoTy {
	single: TimeoutFireSTy=TimeoutFireSingle
	repeating: TimeoutFireRTy=TimeoutFireRepeating
}
