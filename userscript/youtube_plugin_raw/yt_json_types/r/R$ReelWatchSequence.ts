type R_ReelWatchSequence={
	responseContext: RC$ResponseContext;
	entries: T$Command<E_ReelWatch>[];
	trackingParams: string;
	continuationEndpoint?: E_Continuation;
};