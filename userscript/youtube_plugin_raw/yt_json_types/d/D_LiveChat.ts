type D_Continuation={
	continuation: string;
	clickTrackingParams: string;
};
type D_ReloadContinuationData={reloadContinuationData: D_Continuation|D_Continuation;};
type D_LiveChat={
	continuations: D_ReloadContinuationData[];
	header: R_LiveChatHeader;
	trackingParams: string;
	clientMessages: {
		reconnectMessage: G_Text;
		unableToReconnectMessage: G_Text;
		fatalError: G_Text;
		reconnectedMessage: G_Text;
		genericError: G_Text;
	};
	isReplay: true;
	initialDisplayState: "LIVE_CHAT_DISPLAY_STATE_EXPANDED";
	showHideButton: R_ToggleButton;
};
