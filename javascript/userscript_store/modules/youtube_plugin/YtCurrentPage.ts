import {YTPlayerData} from "./youtube_plugin.user"

export class YtCurrentPage extends HTMLElement {
	/**@return {YTPlayerData} */
	getPlayer(): YTPlayerData {
		return new YTPlayerData
	}
}
