import {TimeoutClearStringS, TimeoutClearStringR} from "types/constants"

export type TimeoutClearStringsTy = {
	single: typeof TimeoutClearStringS
	repeating: typeof TimeoutClearStringR
}
