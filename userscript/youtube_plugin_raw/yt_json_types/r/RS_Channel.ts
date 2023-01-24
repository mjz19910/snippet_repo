type RS_Channel={
	responseContext: RC_ResponseContext;
	contents: R_TwoColumnBrowseResults;
	header: R_C4TabbedHeader;
	metadata: R_Channel_MD;
	trackingParams: string;
	topbar: R_DesktopTopbar;
	microformat: R_Microformat;
	onResponseReceivedActions: C_ResetChannelUnreadCount[];
};