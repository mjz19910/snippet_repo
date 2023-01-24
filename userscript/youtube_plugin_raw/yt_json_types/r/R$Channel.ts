type R_Channel={
	responseContext: RC$ResponseContext;
	contents: R_TwoColumnBrowseResults;
	header: R_C4TabbedHeader;
	metadata: R_ChannelMetadata;
	trackingParams: string;
	topbar: R_DesktopTopbar;
	microformat: R_MicroformatData;
	onResponseReceivedActions: C_ResetChannelUnreadCount[];
};