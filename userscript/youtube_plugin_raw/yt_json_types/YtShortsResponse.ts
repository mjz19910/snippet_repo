type YtShortsResponse={
	page: "shorts";
	endpoint: ReelWatchEndpoint;
	response: ReelResponse;
	playerResponse: PlayerResponse;
	reelWatchSequenceResponse: {
		responseContext: ResponseContext;
		entries: CommandTemplate<ReelWatchEndpoint>[];
		trackingParams: string;
		continuationEndpoint: ContinuationEndpoint
	};
	url: `/shorts/${string}`;
};