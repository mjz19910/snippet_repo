import {YtdPageManagerElementInterface} from "./YtdPageManagerElementInterface.js";
import {HistoryManager} from "./HistoryManager";


export abstract class YtdAppElementBase_ extends HTMLElement {
	abstract $: {
		historyManager: HistoryManager;
		["page-manager"]: YtdPageManagerElementInterface;
	};
}
