type LiveChatTextMessageData={
	message: TextWithRuns;
	authorName: TextWithRuns;
	authorPhoto: Thumbnail;
	contextMenuEndpoint: {};
	id: string;
	authorBadges?: LiveChatAuthorBadgeRenderer[];
	timestampUsec: `${number}`;
	authorExternalChannelId: `UC${string}`;
	contextMenuAccessibility: Accessibility;
	timestampText: TextWithRuns;
};