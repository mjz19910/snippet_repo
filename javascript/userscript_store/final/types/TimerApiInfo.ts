import {TimerApiMessageIds} from "./TimerApiMessageIds";

export type TimerApiInfo = TimerApiMessageIds & {
	set_single: "setTimeout";
	set_repeating: "setInterval";
	clear_single: "clearTimeout";
	clear_repeating: "clearInterval";
};
