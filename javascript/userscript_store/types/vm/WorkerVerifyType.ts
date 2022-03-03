import {TIMER_REPEATING, TIMER_SINGLE, TIMER_TAG_COUNT} from "types/constants";

export type WorkerVerifyType = {
	TIMER_SINGLE: typeof TIMER_SINGLE;
	TIMER_REPEATING: typeof TIMER_REPEATING;
	TIMER_TAG_COUNT: typeof TIMER_TAG_COUNT;
};
