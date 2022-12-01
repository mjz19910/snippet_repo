import {TimeoutSetStringSingle,TimeoutSetStringRepeating} from "../constants.js"

export type TimeoutSetStringsTy={
	single: typeof TimeoutSetStringSingle
	repeating: typeof TimeoutSetStringRepeating
}
