type PlaylistResponse=T$Contents<R$TwoColumnBrowseResults>&{
	responseContext: RC$ResponseContext;
	header: PlaylistHeaderRenderer;
	alerts?: AlertWithButtonRenderer[];
	metadata: PlaylistMetadataRenderer;
	trackingParams: string;
	topbar: R$DesktopTopbar;
	microformat: R$MicroformatDataRenderer;
	sidebar: PlaylistSidebarRenderer;
};