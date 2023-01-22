type R_ReelWatchSequence={
	responseContext: RC$ResponseContext;
	entries: T$Command<E_ReelWatchEndpoint>[];
	trackingParams: string;
	continuationEndpoint?: E_Continuation;
};