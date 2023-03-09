type GM_CreateCommentReply={
	sendPost: true;
	apiUrl: "/youtubei/v1/comment/create_comment_reply";
};
type M_CreateCommentReply={webCommandMetadata: GM_CreateCommentReply;};
type DE_CreateCommentReply={createReplyParams: string;};
type E_CreateCommentReply={
	clickTrackingParams: string;
	commandMetadata: M_CreateCommentReply;
	createCommentReplyEndpoint: DE_CreateCommentReply;
};
