import {EventListenerValue} from "./EventListenerValue";
import {GenericEvent} from "./GenericEvent";
import {GenericEventListenerOrEventListenerObject} from "./GenericEventListenerOrEventListenerObject";

interface GenericEventTarget {
	_events: Map<string, EventListenerValue[]>;
	addEventListener(
		type: string,
		callback: GenericEventListenerOrEventListenerObject | null,
		options?: AddEventListenerOptions | boolean
	): void;
	dispatchEvent(event: GenericEvent): boolean;
	/** Removes the event listener in target's event listener list with the same type, callback, and options. */
	removeEventListener(
		type: string,
		callback: GenericEventListenerOrEventListenerObject | null,
		options?: EventListenerOptions | boolean
	): void;
}
