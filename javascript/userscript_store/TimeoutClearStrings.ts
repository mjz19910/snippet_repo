import {TimeoutClearStringsTy} from "./TimeoutClearStringsTy";
import {TimeoutClearStringS, TimeoutClearStringR} from "./rebuild_the_universe_auto_typed_v0.2";

export class TimeoutClearStrings implements TimeoutClearStringsTy {
	single: typeof TimeoutClearStringS = TimeoutClearStringS;
	repeating: typeof TimeoutClearStringR = TimeoutClearStringR;
}
