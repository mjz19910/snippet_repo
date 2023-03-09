type RSB_EditPlaylist={
	responseContext: RC_ResponseContext;
	actions: GA_EditPlaylist[];
	status: "STATUS_SUCCEEDED";
	playlistEditResults: G_PlaylistEditResult[];
	trackingParams: string;
};
