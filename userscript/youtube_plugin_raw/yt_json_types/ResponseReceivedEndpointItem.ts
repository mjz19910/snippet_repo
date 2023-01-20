type ResponseReceivedEndpointItem=
	|AdsControlFlowOpportunityReceivedCommand
	|AppendContinuationItemsAction
	|ChangeKeyedMarkersVisibilityCommand
	|LoadMarkersCommand
	|ReloadContinuationItemsCommand
	|E_SignalServiceEndpoint
	;
type AppendContinuationItemsAction={
	clickTrackingParams: string;
	appendContinuationItemsAction: AppendContinuationItemsActionData;
};