type R_BrowseEditPlaylist={
	responseContext: RC$ResponseContext;
	status: "STATUS_SUCCEEDED";
	playlistEditResults: {}[];
	trackingParams: string;
}&T_Actions<C$RefreshPlaylist|TA_OpenPopup<{}>>;