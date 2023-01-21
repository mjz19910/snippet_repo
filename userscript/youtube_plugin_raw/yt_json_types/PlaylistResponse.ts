type PlaylistResponse=ContentsTemplate<R$TwoColumnBrowseResults>&{
	responseContext: RC$ResponseContext;
	header: PlaylistHeaderRenderer;
	alerts?: AlertWithButtonRenderer[];
	metadata: PlaylistMetadataRenderer;
	trackingParams: string;
	topbar: DesktopTopbarRenderer;
	microformat: MicroformatDataRenderer;
	sidebar: PlaylistSidebarRenderer;
};