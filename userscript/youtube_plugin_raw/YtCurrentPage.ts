import {YTDPlayerElement} from "./YTDPlayerElement";

export interface YtCurrentPage extends HTMLElement {
	getPlayer(): YTDPlayerElement;
	__has_theater_handler_plugin: boolean|undefined;
}
