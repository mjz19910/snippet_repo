type ReelWatchSequenceResponse={
	responseContext: ResponseContext;
	entries: CommandTemplate<ReelWatchEndpoint>[];
	trackingParams: string;
	continuationEndpoint: ContinuationEndpoint;
};