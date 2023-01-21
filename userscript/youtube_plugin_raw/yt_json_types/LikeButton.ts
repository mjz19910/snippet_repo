type LikeButton={
	target: LikeApiData;
	likeStatus: "INDIFFERENT";
	trackingParams: string;
	likesAllowed: boolean;
	serviceEndpoints: E$LikeEndpoint[];
}|{
	target: {
		videoId: string;
	};
	likeStatus: "INDIFFERENT";
	likeCount: 44008;
	likeCountText: D$SimpleText;
	likeCountWithLikeText: D$SimpleText;
	likeCountWithUnlikeText: D$SimpleText;
	dislikeCountText: D$SimpleText;
	dislikeCountWithDislikeText: D$SimpleText;
	dislikeCountWithUndislikeText: D$SimpleText;
	trackingParams: string;
	likesAllowed: true;
	serviceEndpoints: {
		clickTrackingParams: string;
		commandMetadata: CommandMetadata;
		likeEndpoint: {};
	}[];
	likeCountTooltipText: D$TextWithRuns;
	dislikeCountTooltipText: D$TextWithRuns;
};