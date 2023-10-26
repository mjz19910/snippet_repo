import {YtdPlayerElement} from "./YtdPlayerElement.ts";

export interface YtCurrentPage extends HTMLElement {
	getPlayer(): YtdPlayerElement;
	__theater_handler_plugin_attached: boolean|undefined;
}
