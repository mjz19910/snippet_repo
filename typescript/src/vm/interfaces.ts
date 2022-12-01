import {
	TimeoutClearStringRepeating,
	TimeoutClearStringSingle,
	TimeoutSetStringRepeating,
	TimeoutSetStringSingle
} from "./constants.js";
import {
	TimeoutClearStringsT,
	TimeoutSetStringsT
} from "./constant_types.js";

export class TimeoutClearStrings implements TimeoutClearStringsT {
	single: typeof TimeoutClearStringSingle=TimeoutClearStringSingle;
	repeating: typeof TimeoutClearStringRepeating=TimeoutClearStringRepeating;
}

export class TimeoutSetStrings implements TimeoutSetStringsT {
	single: typeof TimeoutSetStringSingle=TimeoutSetStringSingle;
	repeating: typeof TimeoutSetStringRepeating=TimeoutSetStringRepeating;
}
