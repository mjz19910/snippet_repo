import {TimeoutSetStringS, TimeoutSetStringR} from "./typed_mod_rebuild_auto";

export type TimeoutSetStringsTy = {
	single: typeof TimeoutSetStringS;
	repeating: typeof TimeoutSetStringR;
};
