type LikeLikeEndpointData={
	status: "LIKE";
	target: LikeApiData;
	actions?: MusicLibraryStatusUpdateCommand[];
	likeParams: string;
};