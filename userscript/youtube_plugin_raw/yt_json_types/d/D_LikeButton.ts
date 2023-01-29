type D_LikeButton={
	target: D_LikeApi;
	likeStatus: "INDIFFERENT";
	likeCount: number;
	likeCountText: G_Text;
	likeCountWithLikeText: G_Text;
	likeCountWithUnlikeText: G_Text;
	dislikeCountText: G_Text;
	dislikeCountWithDislikeText: G_Text;
	dislikeCountWithUndislikeText: G_Text;
	trackingParams: string;
	likesAllowed: true;
	serviceEndpoints: E_Like[];
	likeCountTooltipText: G_Text;
	dislikeCountTooltipText: G_Text;
};