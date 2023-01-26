type GA_EditPlaylist=C_RefreshPlaylist|TA_OpenPopup<{}>;

type RSB_EditPlaylist={
	responseContext: RC_ResponseContext;
	actions: GA_EditPlaylist[];
	status: "STATUS_SUCCEEDED";
	playlistEditResults: {}[];
	trackingParams: string;
};