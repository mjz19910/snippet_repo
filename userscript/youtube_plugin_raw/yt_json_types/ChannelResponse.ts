type ChannelResponse={
	responseContext: ResponseContext;
	contents: R$TwoColumnBrowseResults;
	header: C4TabbedHeaderRenderer;
	metadata: ChannelMetadataRenderer;
	trackingParams: string;
	topbar: DesktopTopbarRenderer;
	microformat: MicroformatDataRenderer;
	onResponseReceivedActions: ResetChannelUnreadCountCommand[];
};