export class MessageChannelWithReadonlyPorts {
	get port1() {
		return Object.freeze(MessageChannel.prototype.port1)
	}
	get port2() {
		return Object.freeze(MessageChannel.prototype.port2)
	}
}
