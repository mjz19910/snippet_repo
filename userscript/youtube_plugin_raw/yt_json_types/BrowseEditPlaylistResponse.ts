type BrowseEditPlaylistResponse={
	responseContext: RC$ResponseContext;
	status: "STATUS_SUCCEEDED";
	actions: (RefreshPlaylistCommand|T$OpenPopup<{}>)[];
	playlistEditResults: {}[];
	trackingParams: string;
};