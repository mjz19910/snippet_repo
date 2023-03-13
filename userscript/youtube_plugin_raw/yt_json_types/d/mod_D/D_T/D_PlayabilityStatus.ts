type D_PlayabilityStatus={
	status: "OK";
	reason?: D_PlayabilityOkReason;
	playableInEmbed: boolean;
	liveStreamability?: R_LiveStreamability;
	offlineability?: R_Button;
	miniplayer?: R_Miniplayer;
	contextParams: string;
}|{
	status: "LIVE_STREAM_OFFLINE";
	reason: "This live event will begin in a few moments.";
	playableInEmbed: true;
	liveStreamability: R_LiveStreamability;
	miniplayer: R_Miniplayer;
	contextParams: string;
}|{
	status: "UNPLAYABLE";
	errorScreen: R_PlayerErrorMessage;
};
