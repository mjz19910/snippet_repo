import {GenericEvent} from "./GenericEvent";

export class GenericDataEvent extends GenericEvent {
	constructor(type: string, data: object);
}
