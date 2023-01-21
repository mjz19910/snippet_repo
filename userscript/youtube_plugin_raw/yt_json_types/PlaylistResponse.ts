type PlaylistResponse=ContentsTemplate<R$TwoColumnBrowseResults>&{
	responseContext: RC$ResponseContext;
	header: PlaylistHeaderRenderer;
	alerts?: AlertWithButtonRenderer[];
	metadata: PlaylistMetadataRenderer;
	trackingParams: string;
	topbar: R$DesktopTopbar;
	microformat: MicroformatDataRenderer;
	sidebar: PlaylistSidebarRenderer;
};