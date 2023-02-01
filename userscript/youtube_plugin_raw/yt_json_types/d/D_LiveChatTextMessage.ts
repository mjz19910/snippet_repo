type D_LiveChatTextMessage={
	message: G_Text;
	authorName: G_Text;
	authorPhoto: D_Thumbnail;
	contextMenuEndpoint: {};
	id: string;
	authorBadges?: R_LiveChatAuthorBadge[];
	timestampUsec: `${number}`;
	authorExternalChannelId: `UC${string}`;
	contextMenuAccessibility: D_Accessibility;
	timestampText: G_Text;
};