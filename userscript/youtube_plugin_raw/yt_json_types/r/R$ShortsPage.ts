type R$ShortsPage={
	page: "shorts";
	endpoint: E$ReelWatchEndpoint;
	response: R$Reel;
	playerResponse: R$Player;
	reelWatchSequenceResponse?: R$ReelWatchSequence;
	url: `/shorts/${string}`;
	cachedReelWatchSequenceResponse?: R$ReelWatchSequence;
}|{
	rootVe: 37414;
	url: `/shorts/${string}`;
	endpoint: E$ReelWatchEndpoint;
	page: "shorts";
	playerResponse: R$Player;
	reelWatchSequenceResponse: R$ReelWatchSequence|undefined;
	response: R$Reel;
	cachedReelWatchSequenceResponse: R$ReelWatchSequence;
};