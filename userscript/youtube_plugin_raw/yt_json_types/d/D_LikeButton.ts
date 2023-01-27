type D_LikeButton={
	target: D_LikeApi;
	likeStatus: "INDIFFERENT";
	likeCount: number;
	likeCountText: R_SimpleText;
	likeCountWithLikeText: R_SimpleText;
	likeCountWithUnlikeText: R_SimpleText;
	dislikeCountText: R_SimpleText;
	dislikeCountWithDislikeText: R_SimpleText;
	dislikeCountWithUndislikeText: R_SimpleText;
	trackingParams: string;
	likesAllowed: true;
	serviceEndpoints: E_Like[];
	likeCountTooltipText: R_TextRuns;
	dislikeCountTooltipText: R_TextRuns;
};