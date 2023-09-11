import {YtCurrentPage} from "./YtCurrentPage.js";

export interface YtdPageManagerElementInterface extends HTMLElement {
	getCurrentPage(): YtCurrentPage;
	getCurrentData(): {};
}
