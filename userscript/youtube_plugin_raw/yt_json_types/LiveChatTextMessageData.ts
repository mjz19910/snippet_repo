type LiveChatTextMessageData={
	message: D$TextWithRuns;
	authorName: D$TextWithRuns;
	authorPhoto: D$Thumbnail;
	contextMenuEndpoint: {};
	id: string;
	authorBadges?: R$LiveChatAuthorBadge[];
	timestampUsec: `${number}`;
	authorExternalChannelId: `UC${string}`;
	contextMenuAccessibility: A$Accessibility;
	timestampText: D$TextWithRuns;
};