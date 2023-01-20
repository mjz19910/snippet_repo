type ServiceEndpointAction=$SendFeedbackAction|AddToPlaylistCommand|OpenPopupAction|SignalAction|OpenPopupAction;

type $SendFeedbackAction={
	clickTrackingParams: string;
	sendFeedbackAction: {
		bucket: "Kevlar";
	};
};