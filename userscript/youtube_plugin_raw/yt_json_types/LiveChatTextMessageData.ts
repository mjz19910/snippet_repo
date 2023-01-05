type LiveChatTextMessageData={
	message: TextT;
	authorName: TextT;
	authorPhoto: Thumbnail;
	contextMenuEndpoint: YtEndpoint;
	id: string;
	timestampUsec: `${number}`;
	authorExternalChannelId: `UC${string}`;
	contextMenuAccessibility: Accessibility;
	timestampText: TextT;
};
