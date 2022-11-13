import {YtdPlayerElement} from "./YtdPlayerElement.js";

export class YtCurrentPage extends HTMLElement {
	getPlayer(): YtdPlayerElement {
		return new YtdPlayerElement;
	}
}
