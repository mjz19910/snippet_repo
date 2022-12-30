import {ReelWatchEndpoint} from "./ReelWatchEndpoint";
import {ShortsResponsePlayer} from "./ShortsResponsePlayer";
import {ShortsResponse} from "./ShortsResponse";
import {ReelWatchSequenceResponse} from "./ReelWatchSequenceResponse";

export type ShortsPageResponse={
	page: "shorts";
	endpoint: ReelWatchEndpoint;
	response: ShortsResponse;
	playerResponse: ShortsResponsePlayer;
	reelWatchSequenceResponse: ReelWatchSequenceResponse;
	url: `/shorts/${string}`;
};
