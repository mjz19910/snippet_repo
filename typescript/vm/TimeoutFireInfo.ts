import {TimeoutFireSTy} from "./TimeoutFireSTy"
import {TimeoutFireRTy} from "./TimeoutFireRTy"
import {TimeoutFireInfoTy} from "./TimeoutFireInfoTy"
import {TimeoutFireS,TimeoutFireR} from "typescript/constants"

export class TimeoutFireInfo implements TimeoutFireInfoTy {
	single: TimeoutFireSTy=TimeoutFireS
	repeating: TimeoutFireRTy=TimeoutFireR
}
