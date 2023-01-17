type WatchPageResponse={
	page: "watch";
	endpoint: WatchEndpoint;
	response: WatchResponse;
	playerResponse: PlayerResponse;
	url:
	|`/watch?v=${string}&list=RD${string}&start_radio=1`
	|`/watch?v=${string}&list=RD${string}&index=${number}`;
	previousCsn?: string;
}|{
	rootVe: 3832;
	url: `/watch?v=${string}`;
	endpoint: WatchEndpoint;
	page: "watch";
	preconnect: [`https://rr${number}---sn-nx${number}${string}${number}${string}${number}${string}.googlevideo.com/generate_204`];
	playerResponse: PlayerResponse;
	response: WatchResponse;
};