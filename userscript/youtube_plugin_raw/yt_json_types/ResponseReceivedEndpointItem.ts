type EI$ResponseReceived=
	|C$AdsControlFlowOpportunityReceived
	|A_AppendContinuationItems
	|ChangeKeyedMarkersVisibilityCommand
	|LoadMarkersCommand
	|ReloadContinuationItemsCommand
	|E_T$SignalService<{}>
	;
type A_AppendContinuationItems={
	clickTrackingParams: string;
	appendContinuationItemsAction: G_AppendContinuationItems;
};