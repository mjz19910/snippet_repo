import {Box} from "../box/Box.js"
import {GenericEvent} from "./GenericEvent.js"

export class GenericDataEvent extends GenericEvent {
	data: Box
	constructor(type: string,data: Box) {
		super(type)
		this.data=data
	}
}
