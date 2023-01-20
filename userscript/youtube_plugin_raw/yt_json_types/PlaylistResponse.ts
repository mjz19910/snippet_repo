type PlaylistResponse=ContentsTemplate<TwoColumnBrowseResultsRenderer>&{
	responseContext: ResponseContext;
	header: PlaylistHeaderRenderer;
	metadata: PlaylistMetadataRenderer;
	trackingParams: string;
	topbar: DesktopTopbarRenderer;
	microformat: MicroformatDataRenderer;
	sidebar: PlaylistSidebarRenderer;
};