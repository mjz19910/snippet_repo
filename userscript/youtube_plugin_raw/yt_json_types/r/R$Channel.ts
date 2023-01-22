type R$Channel={
	responseContext: RC$ResponseContext;
	contents: R$TwoColumnBrowseResults;
	header: R$C4TabbedHeader;
	metadata: R$ChannelMetadata;
	trackingParams: string;
	topbar: R$DesktopTopbar;
	microformat: R$MicroformatData;
	onResponseReceivedActions: C$ResetChannelUnreadCount[];
};