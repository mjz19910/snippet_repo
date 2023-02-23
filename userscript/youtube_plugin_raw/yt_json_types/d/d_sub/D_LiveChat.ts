type D_Continuation={
	continuation: string;
	clickTrackingParams: string;
};
type D_ReloadContinuationData={
	reloadContinuationData: D_Continuation;
};
type D_LiveChat={
	continuations: D_ReloadContinuationData[];
	header: R_LiveChatHeader;
	trackingParams: string;
	clientMessages: D_ClientMessages;
	isReplay?: boolean;
	initialDisplayState: "LIVE_CHAT_DISPLAY_STATE_EXPANDED";
	showHideButton: R_ToggleButton;
};
