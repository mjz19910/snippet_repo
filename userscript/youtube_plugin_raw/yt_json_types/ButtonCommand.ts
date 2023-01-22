type ButtonCommand=
	|ChangeEngagementPanelVisibilityAction
	|C$Continuation
	|OpenPopupAction
	|E$SignalServiceEndpoint
	|$CreateBackstagePostEndpoint
	|E$UrlEndpoint
	|CommandExecutorCommand
	;
;
type $CreateBackstagePostEndpoint={
	clickTrackingParams: string;
	commandMetadata: G$Metadata;
	createBackstagePostEndpoint: {
		createBackstagePostParams: string;
	};
};