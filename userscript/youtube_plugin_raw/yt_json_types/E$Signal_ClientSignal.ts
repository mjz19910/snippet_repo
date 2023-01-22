type Signal$ClientSignal={
	signal: "CLIENT_SIGNAL";
	actions: (SendFeedbackAction$ShowEngagementPanelEndpoint|A$SendFeedbackAction|SignalAction|A$OpenPopup)[];
};
type SendFeedbackAction$ShowEngagementPanelEndpoint={
	clickTrackingParams: string;
	showEngagementPanelEndpoint: {
		panelIdentifier: "engagement-panel-searchable-transcript";
	};
};