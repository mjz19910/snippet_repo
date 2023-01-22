type R_ReelWatchSequence={
	responseContext: RC$ResponseContext;
	entries: T$Command<E$ReelWatchEndpoint>[];
	trackingParams: string;
	continuationEndpoint?: E$Continuation;
};