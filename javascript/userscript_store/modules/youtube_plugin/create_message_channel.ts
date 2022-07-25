import {MessageChannelWithReadonlyPorts} from "./MessageChannelWithReadonlyPorts"
import {on_port_message} from "./on_port_message"

export function create_message_channel(): Readonly<MessageChannelWithReadonlyPorts> {
	let channel=Object.freeze(new MessageChannel())
	let {port1,port2}=channel
	port2.onmessage=on_port_message
	Object.freeze(port1)
	Object.freeze(port2)
	return channel
}
