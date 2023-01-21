type BrowseEditPlaylistResponse={
	responseContext: RC$ResponseContext;
	status: "STATUS_SUCCEEDED";
	actions: (RefreshPlaylistCommand|OpenPopupAction)[];
	playlistEditResults: {}[];
	trackingParams: string;
};