import {YtdPlayerElement} from "./YtdPlayerElement";

export interface YtCurrentPage extends HTMLElement {
	getPlayer(): YtdPlayerElement;
	__has_theater_handler_plugin: boolean|undefined;
}
