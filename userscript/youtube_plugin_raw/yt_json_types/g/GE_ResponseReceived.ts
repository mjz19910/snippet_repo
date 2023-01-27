type GE_ResponseReceived=
	|A_AppendContinuationItems
	|C_AdsControlFlowOpportunityReceived
	|C_ChangeKeyedMarkersVisibility
	|C_LoadMarkers
	|C_ReloadContinuationItems
	|T_SE_Signal<{},G_ClientSignal>
	;
type A_AppendContinuationItems={
	clickTrackingParams: string;
	appendContinuationItemsAction: G_AppendContinuationItems;
};