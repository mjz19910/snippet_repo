type VE3832_WatchPageResponse={
	rootVe: 3832;
	url: WatchPageUrl;
	endpoint: WatchEndpoint;
	page: "watch";
	preconnect?: [VE3832_PreconnectUrl];
	playerResponse: PlayerResponse;
	response: WatchResponse;
};
