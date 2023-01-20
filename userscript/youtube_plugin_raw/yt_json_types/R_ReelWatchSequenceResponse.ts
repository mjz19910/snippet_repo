type R_ReelWatchSequenceResponse={
	responseContext: ResponseContext;
	entries: CommandTemplate<E_ReelWatchEndpoint>[];
	trackingParams: string;
	continuationEndpoint?: ContinuationCommand;
};
