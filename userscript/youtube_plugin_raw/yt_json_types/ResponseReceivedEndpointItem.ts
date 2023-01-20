type ResponseReceivedEndpointItem=
	|AdsControlFlowOpportunityReceivedCommand
	|AppendContinuationItemsAction
	|ChangeKeyedMarkersVisibilityCommand
	|LoadMarkersCommand
	|ReloadContinuationItemsCommand
	|E$SignalServiceEndpoint
	;
type AppendContinuationItemsAction={
	clickTrackingParams: string;
	appendContinuationItemsAction: AppendContinuationItemsActionData;
};