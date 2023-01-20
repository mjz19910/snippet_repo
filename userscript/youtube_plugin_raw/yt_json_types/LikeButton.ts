type LikeButton={
	target: LikeApiData;
	likeStatus: "INDIFFERENT";
	trackingParams: string;
	likesAllowed: boolean;
	serviceEndpoints: E$LikeEndpoint[];
}|LikeButton_2;