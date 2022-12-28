import {GeneralHistoryState} from "../dfg/GeneralHistoryState.js";
import {PlaylistEndpoint} from "./PlaylistEndpoint";
import {PlaylistResponse} from "./PlaylistResponse";

export interface PageTypePlaylist<VideoId extends string> extends GeneralHistoryState {
	pageType: "playlist";
	endpoint: PlaylistEndpoint<VideoId>;
	response: PlaylistResponse<VideoId>;
}
