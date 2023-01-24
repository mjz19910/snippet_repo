type RSB_EditPlaylist={
	responseContext: RC$ResponseContext;
	status: "STATUS_SUCCEEDED";
	playlistEditResults: {}[];
	trackingParams: string;
}&T_Actions<C_RefreshPlaylist|TA_OpenPopup<{}>>;