type CommentData={
	authorText: TextT;
	authorThumbnail: Thumbnail;
	authorEndpoint: {};
	contentText: TextT;
	publishedTimeText: TextT;
	isLiked: boolean;
	actionMenu: MenuRenderer;
	commentId: string;
	actionButtons: CommentActionButtonsRenderer;
	authorIsChannelOwner: boolean;
	currentUserReplyThumbnail: Thumbnail;
	voteStatus: "INDIFFERENT";
	trackingParams: string;
	voteCount: TextT;
	expandButton: ButtonRenderer;
	collapseButton: ButtonRenderer;
	loggingDirectives: LoggingDirectives;
};