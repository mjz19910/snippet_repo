export interface ReadonlyMessageChannel {
	readonly port1: Readonly<MessagePort>;
	readonly port2: Readonly<MessagePort>;
}
