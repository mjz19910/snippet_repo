type ShortsPageResponse={
	page: "shorts";
	endpoint: E_ReelWatchEndpoint;
	response: ReelResponse;
	playerResponse: PlayerResponse;
	reelWatchSequenceResponse?: R_ReelWatchSequenceResponse;
	url: `/shorts/${string}`;
	cachedReelWatchSequenceResponse?: R_ReelWatchSequenceResponse;
}|{
	rootVe: 37414;
	url: `/shorts/${string}`;
	endpoint: E_ReelWatchEndpoint;
	page: "shorts";
	playerResponse: PlayerResponse;
	reelWatchSequenceResponse: R_ReelWatchSequenceResponse|undefined;
	response: ReelResponse;
	cachedReelWatchSequenceResponse: R_ReelWatchSequenceResponse;
};