type R_ReelWatchSequence={
	responseContext: RC$ResponseContext;
	entries: T_Command_TP<E_ReelWatch>[];
	trackingParams: string;
	continuationEndpoint?: C_Continuation;
};