type D_ReloadContinuationData=CD_Reload;
type D_LiveChat={
	continuations: D_ReloadContinuationData[];
	header: R_LiveChatHeader;
	trackingParams: string;
	clientMessages: D_ClientMessages;
	isReplay: boolean;
	initialDisplayState: "LIVE_CHAT_DISPLAY_STATE_EXPANDED";
	showHideButton: R_ToggleButton;
};
