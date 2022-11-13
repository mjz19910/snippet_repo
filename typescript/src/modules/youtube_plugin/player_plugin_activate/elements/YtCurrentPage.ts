import {YtdPlayerElement} from "./YtdPlayerElement.js";

export interface YtCurrentPage extends HTMLElement {
	getPlayer(): YtdPlayerElement;
}
