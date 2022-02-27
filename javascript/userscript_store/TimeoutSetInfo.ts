import {TimeoutSetSTy} from "./TimeoutSetSTy";
import {TimeoutSetRTy} from "./TimeoutSetRTy";
import {TimeoutSetInfoTy} from "./TimeoutSetInfoTy";
import {TimeoutSetS, TimeoutSetR} from "./rebuild_the_universe_auto_typed_v0.2";

export class TimeoutSetInfo implements TimeoutSetInfoTy {
	single: TimeoutSetSTy = TimeoutSetS;
	repeating: TimeoutSetRTy = TimeoutSetR;
}
