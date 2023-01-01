import {ShortsResponsePlayer} from "./ShortsResponsePlayer";
import {ShortsResponse} from "./ShortsResponse";
import {YtEndpoint} from "../../yt/YtEndpoint.js";

export type ShortsPageResponse={
	page: "shorts";
	endpoint: YtEndpoint;
	response: ShortsResponse;
	playerResponse: ShortsResponsePlayer;
	reelWatchSequenceResponse: {};
	url: `/shorts/${string}`;
};
