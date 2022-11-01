import {TIMER_REPEATING,TIMER_SINGLE,TIMER_TAG_COUNT} from "typescript/src/constants.js"

export type WorkerVerifyType={
	TIMER_SINGLE: typeof TIMER_SINGLE
	TIMER_REPEATING: typeof TIMER_REPEATING
	TIMER_TAG_COUNT: typeof TIMER_TAG_COUNT
}
