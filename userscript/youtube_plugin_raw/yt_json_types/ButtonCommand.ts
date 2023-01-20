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
	commandMetadata: CommandMetadata;
	createBackstagePostEndpoint: {
		createBackstagePostParams: string;
	};
};