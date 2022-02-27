export class GenericEvent {
	type: string;
	readonly defaultPrevented: boolean;
	preventDefault(): void;
}
