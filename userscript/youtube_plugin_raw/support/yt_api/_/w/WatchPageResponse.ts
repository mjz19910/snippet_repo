import {YtEndpoint} from "../../yt/YtEndpoint.js";
import {WatchResponseContent} from "./WatchResponseContent";
import {WatchResponsePlayer} from "./WatchResponsePlayer";

export type WatchPageResponse={
	page: "watch";
	endpoint: YtEndpoint;
	response: WatchResponseContent;
	playerResponse: WatchResponsePlayer;
	url: string;
};
