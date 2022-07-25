import {YtCurrentPage} from "./YtCurrentPage"

export class YtdPageManagerElement extends HTMLElement {
	/**@return {YtCurrentPage} */
	getCurrentPage(): YtCurrentPage {
		return new YtCurrentPage
	}
}
