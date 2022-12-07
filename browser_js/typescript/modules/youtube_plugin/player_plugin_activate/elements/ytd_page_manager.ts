<<<<<<< HEAD
import {YtCurrentPage} from "./interfaces/YtCurrentPage.js";

export interface YtdPageManagerElementInterface extends HTMLElement {
	getCurrentPage(): YtCurrentPage;
}


export const ytd_page_manager: {value:YtdPageManagerElementInterface|null}={value:null}
=======
import {YtdPageManagerElement} from "./interfaces/YtdPageManagerElement.js"

export const ytd_page_manager: {value:YtdPageManagerElement|null}={value:null}
>>>>>>> e10fb913 (u)
