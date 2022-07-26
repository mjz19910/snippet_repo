import {Box} from "types/box/Box"
import {GenericEvent} from "./GenericEvent"

export class GenericDataEvent extends GenericEvent {
	data: Box
	constructor(type: string,data: Box) {
		super(type)
		this.data=data
	}
}
