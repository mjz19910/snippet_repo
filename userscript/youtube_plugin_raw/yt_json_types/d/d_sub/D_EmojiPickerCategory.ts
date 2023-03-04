type D_EmojiPickerCategory={
	categoryId: D_ChannelIdStr;
	title: G_Text;
	emojiIds: `UC${string}/${string}`[];
	trackingParams: string;
	categoryType: "CATEGORY_TYPE_GLOBAL";
}|{
	categoryId: "people";
	title: G_Text;
	emojiIds: "😀"[];
	trackingParams: string;
	imageLoadingLazy: true;
	categoryType: "CATEGORY_TYPE_UNICODE";
}|{
	categoryId: "nature";
	title: G_Text;
	emojiIds: "🐵"[];
	trackingParams: string;
	imageLoadingLazy: true;
	categoryType: "CATEGORY_TYPE_UNICODE";
}|{
	categoryId: "food";
	title: G_Text;
	emojiIds: "🍇"[];
	trackingParams: string;
	imageLoadingLazy: true;
	categoryType: "CATEGORY_TYPE_UNICODE";
}|{
	categoryId: "travel";
	title: G_Text;
	emojiIds: "🌍"[];
	trackingParams: string;
	imageLoadingLazy: true;
	categoryType: "CATEGORY_TYPE_UNICODE";
}|{
	categoryId: "activities";
	title: G_Text;
	emojiIds: "🎃"[];
	trackingParams: string;
	imageLoadingLazy: true;
	categoryType: "CATEGORY_TYPE_UNICODE";
}|{
	categoryId: "objects";
	title: G_Text;
	emojiIds: "👓"[];
	trackingParams: string;
	imageLoadingLazy: true;
	categoryType: "CATEGORY_TYPE_UNICODE";
}|{
	categoryId: "symbols";
	title: G_Text;
	emojiIds: "🏧"[];
	trackingParams: string;
	imageLoadingLazy: true;
	categoryType: "CATEGORY_TYPE_UNICODE";
};
