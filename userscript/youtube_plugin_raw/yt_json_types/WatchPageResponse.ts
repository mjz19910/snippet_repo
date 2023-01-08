type WatchPageResponse={
	page: "watch";
	endpoint: WatchEndpoint;
	response: NextResponse;
	playerResponse: PlayerResponse;
	url: YtUrlFormat;
	previousCsn?: string;
};
