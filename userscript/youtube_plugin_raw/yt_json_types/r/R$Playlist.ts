type R$Playlist=T$Contents<R$TwoColumnBrowseResults>&{
	responseContext: RC$ResponseContext;
	header: R$PlaylistHeader;
	alerts?: R$AlertWithButton[];
	metadata: R$PlaylistMetadata;
	trackingParams: string;
	topbar: R$DesktopTopbar;
	microformat: R$MicroformatData;
	sidebar: R$PlaylistSidebar;
};