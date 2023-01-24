type EI$ResponseReceived=
	|C_AdsControlFlowOpportunityReceived
	|A_AppendContinuationItems
	|C_ChangeKeyedMarkersVisibility
	|LoadMarkersCommand
	|ReloadContinuationItemsCommand
	|TE_SignalService<GS_Client>
	;
type A_AppendContinuationItems={
	clickTrackingParams: string;
	appendContinuationItemsAction: G_AppendContinuationItems;
};