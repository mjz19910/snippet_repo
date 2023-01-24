type R_ShortsPage={
	page: "shorts";
	endpoint: E_ReelWatch;
	response: R_Reel;
	playerResponse: RS_Player;
	reelWatchSequenceResponse?: RS_ReelWatchSequence;
	url: `/shorts/${string}`;
	cachedReelWatchSequenceResponse?: RS_ReelWatchSequence;
}|{
	rootVe: 37414;
	url: `/shorts/${string}`;
	endpoint: E_ReelWatch;
	page: "shorts";
	playerResponse: RS_Player;
	reelWatchSequenceResponse: RS_ReelWatchSequence|undefined;
	response: R_Reel;
	cachedReelWatchSequenceResponse: RS_ReelWatchSequence;
};