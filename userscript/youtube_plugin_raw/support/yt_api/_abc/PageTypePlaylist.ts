import {GeneralHistoryState} from "../dfg/GeneralHistoryState.js";
import {PlaylistEndpoint} from "./PlaylistEndpoint";
import {PlaylistResponse} from "./PlaylistResponse";

export interface PageTypePlaylist extends GeneralHistoryState {
	pageType: "playlist";
	endpoint: PlaylistEndpoint;
	response: PlaylistResponse;
}
