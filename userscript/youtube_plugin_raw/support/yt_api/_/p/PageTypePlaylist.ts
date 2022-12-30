import {GeneralHistoryState} from "../g/GeneralHistoryState.js";
import {PlaylistEndpoint} from "./PlaylistEndpoint";
import {PlaylistPageResponse} from "./PlaylistPageResponse";

export interface PageTypePlaylist extends GeneralHistoryState {
	pageType: "playlist";
	endpoint: PlaylistEndpoint;
	response: PlaylistPageResponse;
}
