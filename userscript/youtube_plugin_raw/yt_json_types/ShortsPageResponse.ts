type R$ShortsPage={
	page: "shorts";
	endpoint: E$ReelWatchEndpoint;
	response: R$Reel;
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
	response: R$Reel;
	cachedReelWatchSequenceResponse: R$ReelWatchSequenceResponse;
};