import {YtdPlayerElement} from "./YtdPlayerElement.js";

export interface YtCurrentPage extends HTMLElement {
	getPlayer(): YtdPlayerElement;
	__theater_handler_plugin_attached: boolean|undefined;
}
