import {GenericEvent} from "./GenericEvent";

export type GenericEventListener = {
	(evt: GenericEvent): void;
};
