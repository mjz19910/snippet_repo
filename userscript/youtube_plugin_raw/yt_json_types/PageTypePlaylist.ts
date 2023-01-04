type PageTypePlaylist={
	pageType: "playlist";
	endpoint: YtEndpoint;
	response: YtPlaylistPageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};