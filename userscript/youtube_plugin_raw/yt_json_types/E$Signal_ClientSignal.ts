type E$Signal_ClientSignal={
	signal: "CLIENT_SIGNAL";
	actions: (SendFeedbackAction$ShowEngagementPanelEndpoint|A$SendFeedbackAction|SignalAction|OpenPopupAction)[];
};
type SendFeedbackAction$ShowEngagementPanelEndpoint={
	clickTrackingParams: string;
	showEngagementPanelEndpoint: {
		panelIdentifier: "engagement-panel-searchable-transcript";
	};
};