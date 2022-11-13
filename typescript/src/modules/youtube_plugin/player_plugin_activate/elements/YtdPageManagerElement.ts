import {YtCurrentPage} from "./YtCurrentPage.js";

export interface YtdPageManagerElement extends HTMLElement {
	getCurrentPage(): YtCurrentPage;
}
