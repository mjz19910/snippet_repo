import {MessageChannelExt} from "./create_message_channel.js";

// deno-lint-ignore no-implicit-declare-namespace-export
declare global {
	interface Window {
		__message_channel_timers: MessageChannelExt;
		__cint?: number|undefined;
		__cint2?: number|undefined;
		__timer_mode?: number|undefined;
	}
}