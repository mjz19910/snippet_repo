type TA_OpenPopup_Empty=TA_OpenPopup<{}>;
type GA_EditPlaylist=C_RefreshPlaylist|TA_OpenPopup_Empty;

type RSB_EditPlaylist={
	responseContext: RC_ResponseContext;
	actions: GA_EditPlaylist[];
	status: "STATUS_SUCCEEDED";
	playlistEditResults: {}[];
	trackingParams: string;
};