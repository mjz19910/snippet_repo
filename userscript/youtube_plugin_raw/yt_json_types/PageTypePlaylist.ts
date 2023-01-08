type PageTypePlaylist={
	pageType: "playlist";
	endpoint: PlaylistEndpoint;
	response: PlaylistPageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};