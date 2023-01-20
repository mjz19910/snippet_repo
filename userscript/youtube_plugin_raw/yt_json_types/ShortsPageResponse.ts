type ShortsPageResponse={
	page: "shorts";
	endpoint: E$ReelWatchEndpoint;
	response: ReelResponse;
	playerResponse: PlayerResponse;
	reelWatchSequenceResponse?: R$ReelWatchSequenceResponse;
	url: `/shorts/${string}`;
	cachedReelWatchSequenceResponse?: R$ReelWatchSequenceResponse;
}|{
	rootVe: 37414;
	url: `/shorts/${string}`;
	endpoint: E$ReelWatchEndpoint;
	page: "shorts";
	playerResponse: PlayerResponse;
	reelWatchSequenceResponse: R$ReelWatchSequenceResponse|undefined;
	response: ReelResponse;
	cachedReelWatchSequenceResponse: R$ReelWatchSequenceResponse;
};