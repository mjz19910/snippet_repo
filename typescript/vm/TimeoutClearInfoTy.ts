import {TimeoutClearSTy} from "./TimeoutClearSTy"
import {TimeoutClearRTy} from "./TimeoutClearRTy"
import {TimeoutClearATy} from "./TimeoutClearATy"

export type TimeoutClearInfoTy={
	single: TimeoutClearSTy
	repeating: TimeoutClearRTy
	any: TimeoutClearATy
}
