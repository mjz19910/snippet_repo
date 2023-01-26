type C_Continuation={
	clickTrackingParams: string;
	commandMetadata?: {
		webCommandMetadata: GM_Next;
	};
	continuationCommand: DC_Continuation;
};