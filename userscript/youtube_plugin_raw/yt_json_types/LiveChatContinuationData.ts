type LiveChatContinuationData={
	continuations: LiveChatContinuationItem[];
	actions?: LiveChatContinuationActions[];
	actionPanel?: LiveChatMessageInputRenderer;
	itemList?: LiveChatItemListRenderer;
	header?: LiveChatHeaderRenderer;
	ticker?: LiveChatTickerRenderer;
	trackingParams?: string;
	participantsList?: LiveChatParticipantsListRenderer;
	popoutMessage?: MessageRenderer;
	emojis?: LiveChatEmoji[];
	clientMessages?: ClientMessages;
	viewerName?: string;
};