export type GM_CreateCommentReply={
	sendPost: true;
	apiUrl: "/youtubei/v1/comment/create_comment_reply";
};
export type M_CreateCommentReply={webCommandMetadata: GM_CreateCommentReply;};
export type DE_CreateCommentReply={createReplyParams: string;};
export type E_CreateCommentReply={
	clickTrackingParams: string;
	commandMetadata: M_CreateCommentReply;
	createCommentReplyEndpoint: DE_CreateCommentReply;
};
