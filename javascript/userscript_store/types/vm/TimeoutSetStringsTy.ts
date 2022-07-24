import {TimeoutSetStringS, TimeoutSetStringR} from "types/constants"

export type TimeoutSetStringsTy = {
	single: typeof TimeoutSetStringS
	repeating: typeof TimeoutSetStringR
}
