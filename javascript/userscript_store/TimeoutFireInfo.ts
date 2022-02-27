import {TimeoutFireSTy} from "./TimeoutFireSTy";
import {TimeoutFireRTy} from "./TimeoutFireRTy";
import {TimeoutFireInfoTy} from "./TimeoutFireInfoTy";
import {TimeoutFireS, TimeoutFireR} from "./rebuild_the_universe_auto_typed_v0.2";

export class TimeoutFireInfo implements TimeoutFireInfoTy {
	single: TimeoutFireSTy = TimeoutFireS;
	repeating: TimeoutFireRTy = TimeoutFireR;
}
