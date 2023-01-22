type R$ReelWatchSequenceResponse={
	responseContext: RC$ResponseContext;
	entries: T$Command<E$ReelWatchEndpoint>[];
	trackingParams: string;
	continuationEndpoint?: E$Continuation;
};
