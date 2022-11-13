import {MessageChannelWithReadonlyPorts} from "./MessageChannelWithReadonlyPorts.js";

export interface MessageChannel {
	value: Readonly<MessageChannelWithReadonlyPorts>|null;
}
