type R_ReelWatchSequenceResponse={
	responseContext: ResponseContext;
	entries: CommandTemplate<E$ReelWatchEndpoint>[];
	trackingParams: string;
	continuationEndpoint?: ContinuationCommand;
};
