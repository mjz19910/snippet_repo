type LikeButton={
	target: LikeApiData;
	likeStatus: "INDIFFERENT";
	trackingParams: string;
	likesAllowed: boolean;
	serviceEndpoints: LikeEndpoint[];
};