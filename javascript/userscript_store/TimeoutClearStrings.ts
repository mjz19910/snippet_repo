import {TimeoutClearStringsTy} from "./TimeoutClearStringsTy";
import {TimeoutClearStringS, TimeoutClearStringR} from "./typed_mod_rebuild_auto";

export class TimeoutClearStrings implements TimeoutClearStringsTy {
	single: typeof TimeoutClearStringS = TimeoutClearStringS;
	repeating: typeof TimeoutClearStringR = TimeoutClearStringR;
}
