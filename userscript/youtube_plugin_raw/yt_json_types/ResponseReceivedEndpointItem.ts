type EI$ResponseReceived=
	|C$AdsControlFlowOpportunityReceived
	|AppendContinuationItemsAction
	|ChangeKeyedMarkersVisibilityCommand
	|LoadMarkersCommand
	|ReloadContinuationItemsCommand
	|E$T$SignalService<{}>
	;
type AppendContinuationItemsAction={
	clickTrackingParams: string;
	appendContinuationItemsAction: G_AppendContinuationItems;
};