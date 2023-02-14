type D_ReloadContinuationData=CD_Reload;
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
