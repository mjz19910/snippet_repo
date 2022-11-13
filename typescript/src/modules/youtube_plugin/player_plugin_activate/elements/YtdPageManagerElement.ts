import {YtCurrentPage} from "./YtCurrentPage.js";

export class YtdPageManagerElement extends HTMLElement {
	getCurrentPage(): YtCurrentPage {
		return new YtCurrentPage;
	}
}
