import {TimeoutSetStringsTy} from "./TimeoutSetStringsTy";
import {TimeoutSetStringS, TimeoutSetStringR} from "./rebuild_the_universe_auto_typed_v0.2";

export class TimeoutSetStrings implements TimeoutSetStringsTy {
	single: typeof TimeoutSetStringS = TimeoutSetStringS;
	repeating: typeof TimeoutSetStringR = TimeoutSetStringR;
}
