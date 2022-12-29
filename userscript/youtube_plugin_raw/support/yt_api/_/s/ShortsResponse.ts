import {ShortsEndpoint} from "./ShortsEndpoint";
import {ShortsResponsePlayer} from "./ShortsResponsePlayer";
import {ShortsResponseContent as ShortsResponseContent} from "./ShortsResponseContent";

export type ShortsResponse={
	page: "shorts";
	endpoint: ShortsEndpoint;
	response: ShortsResponseContent;
	playerResponse: ShortsResponsePlayer;
	reelWatchSequenceResponse: {
		responseContext: {};
		entries: {}[];
		trackingParams: string;
	};
	url: `/shorts/${string}`;
};
