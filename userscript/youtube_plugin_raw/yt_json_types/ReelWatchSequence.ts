type ReelWatchSequence={
	responseContext: ResponseContext;
	entries: CommandTemplate<ReelWatchEndpoint>[];
	trackingParams: string;
	continuationEndpoint: YtEndpoint;
};