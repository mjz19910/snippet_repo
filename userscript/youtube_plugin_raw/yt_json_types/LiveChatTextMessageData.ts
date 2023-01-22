type D__LiveChatTextMessage={
	message: R_TextWithRuns;
	authorName: R_TextWithRuns;
	authorPhoto: D__Thumbnail;
	contextMenuEndpoint: {};
	id: string;
	authorBadges?: R_LiveChatAuthorBadge[];
	timestampUsec: `${number}`;
	authorExternalChannelId: `UC${string}`;
	contextMenuAccessibility: D__Accessibility;
	timestampText: R_TextWithRuns;
};