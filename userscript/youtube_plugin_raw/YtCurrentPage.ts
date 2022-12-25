import {YTDPlayerElement} from "./YTDPlayerElement";

interface YtCurrentPage extends HTMLElement {
	getPlayer(): YTDPlayerElement;
	__has_theater_handler_plugin: boolean|undefined;
}
