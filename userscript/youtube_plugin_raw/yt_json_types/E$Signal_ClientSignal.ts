type Signal$ClientSignal={
	signal: "CLIENT_SIGNAL";
	actions: (SendFeedbackAction$ShowEngagementPanelEndpoint|A$SendFeedbackAction|SignalAction|T$OpenPopup<{}>)[];
};
type SendFeedbackAction$ShowEngagementPanelEndpoint={
	clickTrackingParams: string;
	showEngagementPanelEndpoint: {
		panelIdentifier: "engagement-panel-searchable-transcript";
	};
};