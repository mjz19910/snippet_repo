type ChannelResponse={
	responseContext: ResponseContext;
	contents: TwoColumnBrowseResultsRenderer;
	header: C4TabbedHeaderRenderer;
	metadata: ChannelMetadataRenderer;
	trackingParams: string;
	topbar: DesktopTopbarRenderer;
	microformat: MicroformatDataRenderer;
	onResponseReceivedActions: ResetChannelUnreadCountCommand[];
};