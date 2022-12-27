import {YtCurrentPage} from "./interfaces/YtCurrentPage.js";

export interface YtdPageManagerElementInterface extends HTMLElement {
	getCurrentPage(): YtCurrentPage;
}


export const ytd_page_manager: {value:YtdPageManagerElementInterface|null}={value:null}
