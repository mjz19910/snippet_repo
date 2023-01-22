type R_ShortsPage={
	page: "shorts";
	endpoint: E_ReelWatch;
	response: R_Reel;
	playerResponse: R_Player;
	reelWatchSequenceResponse?: R_ReelWatchSequence;
	url: `/shorts/${string}`;
	cachedReelWatchSequenceResponse?: R_ReelWatchSequence;
}|{
	rootVe: 37414;
	url: `/shorts/${string}`;
	endpoint: E_ReelWatch;
	page: "shorts";
	playerResponse: R_Player;
	reelWatchSequenceResponse: R_ReelWatchSequence|undefined;
	response: R_Reel;
	cachedReelWatchSequenceResponse: R_ReelWatchSequence;
};