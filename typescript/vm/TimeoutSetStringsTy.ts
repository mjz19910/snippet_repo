import {TimeoutSetStringS,TimeoutSetStringR} from "typescript/src/constants.js"

export type TimeoutSetStringsTy={
	single: typeof TimeoutSetStringS
	repeating: typeof TimeoutSetStringR
}
