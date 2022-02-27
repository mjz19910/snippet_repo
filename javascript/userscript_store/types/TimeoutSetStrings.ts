import {TimeoutSetStringsTy} from "./TimeoutSetStringsTy";
import {TimeoutSetStringS, TimeoutSetStringR} from "./typed_mod_rebuild_auto";

export class TimeoutSetStrings implements TimeoutSetStringsTy {
	single: typeof TimeoutSetStringS = TimeoutSetStringS;
	repeating: typeof TimeoutSetStringR = TimeoutSetStringR;
}
