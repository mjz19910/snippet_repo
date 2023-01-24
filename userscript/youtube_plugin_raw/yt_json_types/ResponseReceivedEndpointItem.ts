type EI$ResponseReceived=
	|C$AdsControlFlowOpportunityReceived
	|A_AppendContinuationItems
	|C$ChangeKeyedMarkersVisibility
	|LoadMarkersCommand
	|ReloadContinuationItemsCommand
	|TE_SignalService<GS_Client>
	;
type A_AppendContinuationItems={
	clickTrackingParams: string;
	appendContinuationItemsAction: G_AppendContinuationItems;
};