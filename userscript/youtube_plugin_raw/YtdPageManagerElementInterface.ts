import {YtCurrentPage} from "./YtCurrentPage";

export interface YtdPageManagerElementInterface extends HTMLElement {
	getCurrentPage(): YtCurrentPage;
}
