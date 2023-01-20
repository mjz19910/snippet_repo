type R$ReelWatchSequenceResponse={
	responseContext: ResponseContext;
	entries: CommandTemplate<E$ReelWatchEndpoint>[];
	trackingParams: string;
	continuationEndpoint?: C$Continuation;
};
