import {MessageChannelExt} from "./create_message_channel.js";

// deno-lint-ignore no-implicit-declare-namespace-export
declare global {
	interface Window {
		__message_channel_timers: MessageChannelExt;
	}
}