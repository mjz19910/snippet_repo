type AE_LikeLike={
	status: "LIKE";
	target: LikeApiData;
	actions?: MusicLibraryStatusUpdateCommand[];
	likeParams?: string;
};