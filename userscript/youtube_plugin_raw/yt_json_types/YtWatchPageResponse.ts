type YtWatchPageResponse={
	page: "watch";
	endpoint: YtEndpoint;
	response: WatchNextResponse;
	playerResponse: PlayerResponse;
	url: YtUrlFormat;
	previousCsn?: string;
};
