import {TimeoutFireSTy} from "./TimeoutFireSTy.js"
import {TimeoutFireRTy} from "./TimeoutFireRTy.js"
import {TimeoutFireInfoTy} from "./TimeoutFireInfoTy.js"
import {TimeoutFireS,TimeoutFireR} from "constants.js"

export class TimeoutFireInfo implements TimeoutFireInfoTy {
	single: TimeoutFireSTy=TimeoutFireS
	repeating: TimeoutFireRTy=TimeoutFireR
}
