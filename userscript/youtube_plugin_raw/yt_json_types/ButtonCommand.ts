type ButtonCommand=
	|ChangeEngagementPanelVisibilityAction
	|ContinuationCommand
	|OpenPopupAction
	|E_SignalServiceEndpoint
	|$CreateBackstagePostEndpoint
	|E_UrlEndpoint
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