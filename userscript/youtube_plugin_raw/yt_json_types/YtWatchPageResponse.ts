type YtWatchPageResponse={
	page: "watch";
	endpoint: WatchEndpoint;
	response: WatchNextResponse;
	playerResponse: PlayerResponse;
	url: YtUrlFormat;
	previousCsn?: string;
};
