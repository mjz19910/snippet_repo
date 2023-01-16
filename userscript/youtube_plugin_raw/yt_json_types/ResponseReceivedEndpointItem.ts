type ResponseReceivedEndpointItem=
	|AdsControlFlowOpportunityReceivedCommand
	|AppendContinuationItemsAction
	|ChangeKeyedMarkersVisibilityCommand
	|LoadMarkersCommand
	|ReloadContinuationItemsCommand
	|SignalServiceEndpoint
	;
type AppendContinuationItemsAction={
	clickTrackingParams: string;
	appendContinuationItemsAction: AppendContinuationItemsActionData;
};