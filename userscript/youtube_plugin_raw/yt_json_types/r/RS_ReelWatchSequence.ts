type RS_ReelWatchSequence={
	responseContext: RC_ResponseContext;
	entries: T_Command$<E_ReelWatch>[];
	trackingParams: string;
	continuationEndpoint?: C_Continuation;
};