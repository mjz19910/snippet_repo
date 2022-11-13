import {ReadonlyMessageChannel} from "./MessageChannelWithReadonlyPorts.js";

export interface MessageChannel {
	value: Readonly<ReadonlyMessageChannel>|null;
}
