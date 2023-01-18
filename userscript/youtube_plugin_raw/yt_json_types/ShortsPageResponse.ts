type ShortsPageResponse={
	page: "shorts";
	endpoint: ReelWatchEndpoint;
	response: ReelResponse;
	playerResponse: PlayerResponse;
	reelWatchSequenceResponse: ReelWatchSequenceResponse;
	url: `/shorts/${string}`;
	cachedReelWatchSequenceResponse?: {
		responseContext: ResponseContext;
		entries: {
			command: ReelWatchEndpoint;
			trackingParams: string;
		}[];
		trackingParams: string;
		continuationEndpoint: ContinuationCommand;
	};
};