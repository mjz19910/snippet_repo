import {YTDPlayerElement} from "./YTDPlayerElement.js";

export class YtCurrentPage extends HTMLElement {
	getPlayer(): YTDPlayerElement {
		return new YTDPlayerElement;
	}
}
