type YtWatchPageResponse={
	page: "watch";
	endpoint: YtEndpoint;
	response: WatchNextResponse;
	playerResponse: WatchResponsePlayer;
	url: YtUrlFormat;
	previousCsn?: string;
};
