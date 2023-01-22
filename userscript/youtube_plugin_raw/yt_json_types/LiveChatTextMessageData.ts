type D_LiveChatTextMessage={
	message: R_TextWithRuns;
	authorName: R_TextWithRuns;
	authorPhoto: D_Thumbnail;
	contextMenuEndpoint: {};
	id: string;
	authorBadges?: R_LiveChatAuthorBadge[];
	timestampUsec: `${number}`;
	authorExternalChannelId: `UC${string}`;
	contextMenuAccessibility: D_Accessibility;
	timestampText: R_TextWithRuns;
};