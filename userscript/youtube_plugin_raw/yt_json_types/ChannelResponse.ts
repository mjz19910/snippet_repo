type ChannelResponse={
	responseContext: RC$ResponseContext;
	contents: R$TwoColumnBrowseResults;
	header: R$C4TabbedHeader;
	metadata: ChannelMetadataRenderer;
	trackingParams: string;
	topbar: R$DesktopTopbar;
	microformat: R$MicroformatData;
	onResponseReceivedActions: ResetChannelUnreadCountCommand[];
};