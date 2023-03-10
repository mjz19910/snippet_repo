import {JQueryEventHandler} from "./JQueryEventHandler";

export interface JQueryEvents {
	click?: JQueryEventHandler[];
	mouseup?: JQueryEventHandler[];
}
