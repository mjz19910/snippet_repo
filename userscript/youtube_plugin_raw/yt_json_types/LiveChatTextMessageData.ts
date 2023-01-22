type D__LiveChatTextMessage={
	message: R$TextWithRuns;
	authorName: R$TextWithRuns;
	authorPhoto: D__Thumbnail;
	contextMenuEndpoint: {};
	id: string;
	authorBadges?: R$LiveChatAuthorBadge[];
	timestampUsec: `${number}`;
	authorExternalChannelId: `UC${string}`;
	contextMenuAccessibility: D__Accessibility;
	timestampText: R$TextWithRuns;
};