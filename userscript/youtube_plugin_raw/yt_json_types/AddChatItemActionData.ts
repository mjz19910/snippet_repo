type AddChatItemActionData={
	item: LiveChatItem;
	clientId?: string;
};
type LiveChatItem=
|LiveChatTextMessageRenderer
|LiveChatPlaceholderItemRenderer
|LiveChatViewerEngagementMessageRenderer
;
type LiveChatViewerEngagementMessage={
	id: string;
	timestampUsec: "1673963761515559";
	icon: Icon<"YOUTUBE_ROUND">;
	message: TextWithRuns;
	actionButton: ButtonRenderer;
	trackingParams: string;
};

type LiveChatViewerEngagementMessageRenderer={
	liveChatViewerEngagementMessageRenderer: LiveChatViewerEngagementMessage;
}