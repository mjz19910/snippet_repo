type PageTypePlaylist={
	pageType: "playlist";
	endpoint: YtEndpoint;
	response: YtPlaylistResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};