type E$Signal_ClientSignal={
	signal: "CLIENT_SIGNAL";
	actions: (A$SendFeedbackAction|SignalAction|OpenPopupAction)[];
};