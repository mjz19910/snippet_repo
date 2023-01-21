type ShortsPageResponse={
	page: "shorts";
	endpoint: E$ReelWatchEndpoint;
	response: ReelResponse;
	playerResponse: R$Player;
	reelWatchSequenceResponse?: R$ReelWatchSequenceResponse;
	url: `/shorts/${string}`;
	cachedReelWatchSequenceResponse?: R$ReelWatchSequenceResponse;
}|{
	rootVe: 37414;
	url: `/shorts/${string}`;
	endpoint: E$ReelWatchEndpoint;
	page: "shorts";
	playerResponse: R$Player;
	reelWatchSequenceResponse: R$ReelWatchSequenceResponse|undefined;
	response: ReelResponse;
	cachedReelWatchSequenceResponse: R$ReelWatchSequenceResponse;
};