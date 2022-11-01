import {TimeoutClearSTy} from "./TimeoutClearSTy.js"
import {TimeoutClearRTy} from "./TimeoutClearRTy.js"
import {TimeoutClearATy} from "./TimeoutClearATy.js"

export type TimeoutClearInfoTy={
	single: TimeoutClearSTy
	repeating: TimeoutClearRTy
	any: TimeoutClearATy
}
