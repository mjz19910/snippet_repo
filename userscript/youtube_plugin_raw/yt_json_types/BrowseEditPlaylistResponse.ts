type BrowseEditPlaylistResponse={
	responseContext: RC$ResponseContext;
	status: "STATUS_SUCCEEDED";
	actions: (RefreshPlaylistCommand|A$OpenPopup)[];
	playlistEditResults: {}[];
	trackingParams: string;
};