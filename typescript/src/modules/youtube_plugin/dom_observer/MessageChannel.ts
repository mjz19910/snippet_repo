import {MessageChannelWithReadonlyPorts} from "./MessageChannelWithReadonlyPorts.js";

export type MessageChannel={
	value: Readonly<MessageChannelWithReadonlyPorts>|null;
};
