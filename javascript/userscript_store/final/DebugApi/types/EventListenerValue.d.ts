import {GenericEventListenerOrEventListenerObject} from "./GenericEventListenerOrEventListenerObject";

export interface EventListenerValue {
	callback: GenericEventListenerOrEventListenerObject | null;
	options: boolean | EventListenerOptions;
}
