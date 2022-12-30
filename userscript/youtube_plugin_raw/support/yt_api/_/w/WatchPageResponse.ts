import {WatchEndpoint} from "./WatchEndpoint.js";
import {WatchResponseContent} from "./WatchResponseContent";
import {WatchResponsePlayer} from "./WatchResponsePlayer";

export type WatchPageResponse={
	page: "watch";
	endpoint: WatchEndpoint;
	response: WatchResponseContent;
	playerResponse: WatchResponsePlayer;
	url: string;
};
export type VideoResponse={
	responseContext: {};
};