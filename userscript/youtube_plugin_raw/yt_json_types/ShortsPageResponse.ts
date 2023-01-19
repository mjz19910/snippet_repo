type ShortsPageResponse={
	page: "shorts";
	endpoint: ReelWatchEndpoint;
	response: ReelResponse;
	playerResponse: PlayerResponse;
	reelWatchSequenceResponse?: ReelWatchSequenceResponse;
	url: `/shorts/${string}`;
	cachedReelWatchSequenceResponse?: ReelWatchSequenceResponse;
}|{
	rootVe: 37414;
	url: `/shorts/${string}`;
	endpoint: ReelWatchEndpoint;
	page: "shorts";
	playerResponse: PlayerResponse;
	response: ReelResponse;
	cachedReelWatchSequenceResponse: ReelWatchSequenceResponse;
};