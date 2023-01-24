type RS_Playlist=Record<"contents",R_TwoColumnBrowseResults>&{
	responseContext: RC_ResponseContext;
	header: R_PlaylistHeader;
	alerts?: R_AlertWithButton[];
	metadata: R_Playlist_MD;
	trackingParams: string;
	topbar: R_DesktopTopbar;
	microformat: R_Microformat;
	sidebar: R_PlaylistSidebar;
};