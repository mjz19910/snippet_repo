type PlaylistResponse=T$Contents<R$TwoColumnBrowseResults>&{
	responseContext: RC$ResponseContext;
	header: PlaylistHeaderRenderer;
	alerts?: R$AlertWithButton[];
	metadata: PlaylistMetadataRenderer;
	trackingParams: string;
	topbar: R$DesktopTopbar;
	microformat: R$MicroformatData;
	sidebar: PlaylistSidebarRenderer;
};