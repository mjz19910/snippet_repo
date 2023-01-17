type VE3832_PreconnectUrl=`https://rr${number}---sn-nx${`${"57"}${"yn"}${"ss"}`|"5s7n7s"}.googlevideo.com/generate_204`;

type VE3832_WatchPageResponse={
	rootVe: 3832;
	url: WatchPageUrl;
	endpoint: WatchEndpoint;
	page: "watch";
	preconnect: [VE3832_PreconnectUrl];
	playerResponse: PlayerResponse;
	response: WatchResponse;
};

type Generic_WatchPageResponse={
	page: "watch";
	endpoint: WatchEndpoint;
	response: WatchResponse;
	playerResponse: PlayerResponse;
	url: WatchPageUrl;
	previousCsn?: string;
};

type WatchPageResponse=Generic_WatchPageResponse|VE3832_WatchPageResponse;