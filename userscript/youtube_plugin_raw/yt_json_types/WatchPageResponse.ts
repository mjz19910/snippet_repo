type WatchPageResponse={
	page: "watch";
	endpoint: WatchEndpoint;
	response: WatchResponse;
	playerResponse: PlayerResponse;
	url:
	|`/watch?v=${string}&list=RD${string}&start_radio=1`
	|`/watch?v=${string}&list=RD${string}&index=${number}`;
	previousCsn?: string;
};
type WatchResponse={
	responseContext: ResponseContext;
};