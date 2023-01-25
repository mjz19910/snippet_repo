type D_LiveChatTextMessage={
	message: R_TextRuns;
	authorName: R_TextRuns;
	authorPhoto: D_Thumbnail;
	contextMenuEndpoint: {};
	id: string;
	authorBadges?: R_LiveChatAuthorBadge[];
	timestampUsec: `${number}`;
	authorExternalChannelId: `UC${string}`;
	contextMenuAccessibility: D_Accessibility;
	timestampText: R_TextRuns;
};