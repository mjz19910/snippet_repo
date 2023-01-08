type ShortsPageResponse={
	page: "shorts";
	endpoint: ReelWatchEndpoint;
	response: ReelResponse;
	playerResponse: PlayerResponse;
	reelWatchSequenceResponse: ReelWatchSequenceResponse;
	url: `/shorts/${string}`;
};