type D_LikeButton_Like={
	status: "INDIFFERENT"|"DISLIKE";
	count?: number;
	countText: G_Text;
	countWithLikeText?: G_Text;
	countWithUnlikeText?: G_Text;
	countTooltipText?: G_Text;
};
type D_LikeButton_Dislike={
	countText: G_Text;
	countWithDislikeText?: G_Text;
	countWithUndislikeText?: G_Text;
	countTooltipText?: G_Text;
};
type D_LikeButton_FP=T_AddPrefix<D_LikeButton_Like,"like">;
type T_AddPrefix<T,T2 extends string>={[U in keyof T as `${T2}${Capitalize<U&string>}`]: T[U];};
type D_LikeButton=T_AddPrefix<D_LikeButton_Like,"like">&T_AddPrefix<D_LikeButton_Dislike,"dislike">&{
	target?: D_LikeApi;
	trackingParams?: string;
	likesAllowed: true;
	serviceEndpoints?: E_Like[];
};