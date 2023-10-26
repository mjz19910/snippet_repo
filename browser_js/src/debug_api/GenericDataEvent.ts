import {Box} from "../box/Box.js"
import {GenericEvent} from "./GenericEvent.ts"

export class GenericDataEvent extends GenericEvent {
	data: Box
	constructor(type: string,data: Box) {
		super(type)
		this.data=data
	}
}
