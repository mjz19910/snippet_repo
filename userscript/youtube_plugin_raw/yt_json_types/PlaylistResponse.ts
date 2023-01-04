type PlaylistResponse={
	responseContext: ResponseContext;
	contents: TwoColumnBrowseResultsRenderer;
	header: PlaylistHeaderRenderer;
	metadata: PlaylistMetadataRenderer;
	trackingParams: string;
	topbar: DesktopTopbarRenderer;
	microformat: MicroformatDataRenderer;
	sidebar: PlaylistSidebarRenderer;
};
