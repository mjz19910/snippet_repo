type EI$ResponseReceived=
	|AdsControlFlowOpportunityReceivedCommand
	|AppendContinuationItemsAction
	|ChangeKeyedMarkersVisibilityCommand
	|LoadMarkersCommand
	|ReloadContinuationItemsCommand
	|E$T$SignalService<{}>
	;
type AppendContinuationItemsAction={
	clickTrackingParams: string;
	appendContinuationItemsAction: AppendContinuationItemsActionData;
};