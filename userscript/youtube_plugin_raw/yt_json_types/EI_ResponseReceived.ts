type EI_ResponseReceived=
	|A_AppendContinuationItems
	|C_AdsControlFlowOpportunityReceived
	|C_ChangeKeyedMarkersVisibility
	|C_LoadMarkers
	|C_ReloadContinuationItems
	|TE_SignalService<GS_Client>
	;
type A_AppendContinuationItems={
	clickTrackingParams: string;
	appendContinuationItemsAction: G_AppendContinuationItems;
};