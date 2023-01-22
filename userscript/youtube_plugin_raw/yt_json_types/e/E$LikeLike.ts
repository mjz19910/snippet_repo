type E_LikeLike={
	status: "LIKE";
	target: D_LikeApi;
	actions?: MusicLibraryStatusUpdateCommand[];
	likeParams?: string;
};