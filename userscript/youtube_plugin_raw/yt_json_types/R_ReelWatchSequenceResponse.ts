type R$ReelWatchSequenceResponse={
	responseContext: RC$ResponseContext;
	entries: CommandTemplate<E$ReelWatchEndpoint>[];
	trackingParams: string;
	continuationEndpoint?: E$Continuation;
};
