import {ReadonlyMessageChannel} from "./ReadonlyMessageChannel.js";

export function create_message_channel(on_port_message: (event: MessageEvent<number>) => void): Readonly<ReadonlyMessageChannel> {
	let channel=Object.freeze(new MessageChannel());
	let {port1,port2}=channel;
	port2.onmessage=on_port_message;
	Object.freeze(port1);
	Object.freeze(port2);
	return channel;
}
