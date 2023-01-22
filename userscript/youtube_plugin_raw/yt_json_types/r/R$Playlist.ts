type R_Playlist=T$Contents<R_TwoColumnBrowseResults>&{
	responseContext: RC$ResponseContext;
	header: R_PlaylistHeader;
	alerts?: R_AlertWithButton[];
	metadata: R_PlaylistMetadata;
	trackingParams: string;
	topbar: R_DesktopTopbar;
	microformat: R_MicroformatData;
	sidebar: R_PlaylistSidebar;
};