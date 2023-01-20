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
type $CreateBackstagePostEndpoint=CommandTemplate<{
	createBackstagePostEndpoint: {
		createBackstagePostParams: string;
	};
}>;