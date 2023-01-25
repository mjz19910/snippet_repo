type D_Comment={
	authorText: R_TextRuns;
	authorThumbnail: D_Thumbnail;
	authorEndpoint: {};
	contentText: R_TextRuns;
	publishedTimeText: R_TextRuns;
	isLiked: boolean;
	actionMenu: R_Menu;
	commentId: string;
	actionButtons: R_CommentActionButtons;
	authorIsChannelOwner: boolean;
	currentUserReplyThumbnail: D_Thumbnail;
	voteStatus: "INDIFFERENT";
	trackingParams: string;
	voteCount: R_TextRuns;
	expandButton: R_Button;
	collapseButton: R_Button;
	loggingDirectives: D_LoggingDirectives;
};