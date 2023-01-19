type PlaylistPageResponse={
	page: "playlist";
	endpoint: BrowseEndpoint;
	response: PlaylistResponse;
	url: string;
	expirationTime?: number;
	previousCsn?: string;
};