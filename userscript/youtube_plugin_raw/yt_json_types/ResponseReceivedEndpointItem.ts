type EI$ResponseReceived=
	|C$AdsControlFlowOpportunityReceived
	|AppendContinuationItemsAction
	|ChangeKeyedMarkersVisibilityCommand
	|LoadMarkersCommand
	|ReloadContinuationItemsCommand
	|E_T$SignalService<{}>
	;
type AppendContinuationItemsAction={
	clickTrackingParams: string;
	appendContinuationItemsAction: G_AppendContinuationItems;
};