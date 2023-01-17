type VE3832_WatchPageResponse={
	rootVe: 3832;
	url: VE3832_WatchPageUrl;
	endpoint: WatchEndpoint;
	page: "watch";
	preconnect: [`https://rr${number}---sn-nx${`${"57"}${"yn"}${"ss"}`}.googlevideo.com/generate_204`];
	playerResponse: PlayerResponse;
	response: WatchResponse;
};

type Generic_WatchPageResponse={
	page: "watch";
	endpoint: WatchEndpoint;
	response: WatchResponse;
	playerResponse: PlayerResponse;
	url: GenericWatchPageUrl;
	previousCsn?: string;
};

type WatchPageResponse=Generic_WatchPageResponse|VE3832_WatchPageResponse;