type D_LiveChatTextMessage={
	message: D_Text;
	authorName: D_Text;
	authorPhoto: R_Thumbnail;
	contextMenuEndpoint: {};
	id: string;
	authorBadges?: R_LiveChatAuthorBadge[];
	timestampUsec: `${number}`;
	authorExternalChannelId: `UC${string}`;
	contextMenuAccessibility: D_Accessibility;
	timestampText: D_Text;
};