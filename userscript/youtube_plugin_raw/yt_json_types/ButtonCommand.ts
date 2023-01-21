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
	commandMetadata: M$CommandMetadata;
	createBackstagePostEndpoint: {
		createBackstagePostParams: string;
	};
};