type ChannelResponse={
	responseContext: RC$ResponseContext;
	contents: R$TwoColumnBrowseResults;
	header: C4TabbedHeaderRenderer;
	metadata: ChannelMetadataRenderer;
	trackingParams: string;
	topbar: R$DesktopTopbar;
	microformat: MicroformatDataRenderer;
	onResponseReceivedActions: ResetChannelUnreadCountCommand[];
};