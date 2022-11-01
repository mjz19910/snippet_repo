import {YtCurrentPage} from "./YtCurrentPage.js"

export class YtdPageManagerElement extends HTMLElement {
	/**@return {YtCurrentPage} */
	getCurrentPage(): YtCurrentPage {
		return new YtCurrentPage
	}
}
