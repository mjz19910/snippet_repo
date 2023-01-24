type RSB_EditPlaylist={
	responseContext: RC_ResponseContext;
	status: "STATUS_SUCCEEDED";
	playlistEditResults: {}[];
	trackingParams: string;
}&T_Actions<C_RefreshPlaylist|TA_OpenPopup<{}>>;