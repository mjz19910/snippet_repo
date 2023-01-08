type PageTypePlaylist={
	pageType: "playlist";
	endpoint: YtEndpoint;
	response: PlaylistPageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};