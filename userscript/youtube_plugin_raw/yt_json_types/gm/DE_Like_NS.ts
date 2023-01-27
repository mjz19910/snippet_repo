namespace DE_Like_NS {
	export type DE_Like=DE_LikeIndifferent|DE_LikeLike|DE_LikeDislike;
	type DE_LikeIndifferent={status: "INDIFFERENT"; target: D_LikeApi; removeLikeParams?: string;};
	type DE_LikeLike={status: "LIKE"; target: D_LikeApi; actions?: C_MusicLibraryStatusUpdate[]; likeParams?: string;};
	type DE_LikeDislike={status: "DISLIKE"; target: D_LikeApi; dislikeParams: string;};
}
