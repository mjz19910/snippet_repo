type PlaylistResponse=ContentsTemplate<TwoColumnBrowseResultsRenderer>&{
	responseContext: ResponseContext;
	header: PlaylistHeaderRenderer;
	alerts?: AlertWithButtonRenderer[];
	metadata: PlaylistMetadataRenderer;
	trackingParams: string;
	topbar: DesktopTopbarRenderer;
	microformat: MicroformatDataRenderer;
	sidebar: PlaylistSidebarRenderer;
};