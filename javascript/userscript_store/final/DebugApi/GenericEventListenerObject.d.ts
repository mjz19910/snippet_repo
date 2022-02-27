import {GenericEvent} from "./GenericEvent";

export type GenericEventListenerObject = {
	handleEvent(event: GenericEvent): void;
};
