type D_LikeButton={
	target: D_LikeApi;
	likeStatus: "INDIFFERENT";
	likeCount: number;
	likeCountText: D_Text;
	likeCountWithLikeText: D_Text;
	likeCountWithUnlikeText: D_Text;
	dislikeCountText: D_Text;
	dislikeCountWithDislikeText: D_Text;
	dislikeCountWithUndislikeText: D_Text;
	trackingParams: string;
	likesAllowed: true;
	serviceEndpoints: E_Like[];
	likeCountTooltipText: D_Text;
	dislikeCountTooltipText: D_Text;
};