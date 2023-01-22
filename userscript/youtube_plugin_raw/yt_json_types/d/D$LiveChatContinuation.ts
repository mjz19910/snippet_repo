type D$LiveChatContinuation={
	continuations: G$LiveChatContinuationItem[];
	actions?: LiveChatContinuationActions[];
	actionPanel?: R$LiveChatMessageInput;
	itemList?: R$LiveChatItemList;
	header?: R$LiveChatHeader;
	ticker?: R$LiveChatTicker;
	trackingParams?: string;
	participantsList?: R$LiveChatParticipantsList;
	popoutMessage?: R$Message;
	emojis?: LiveChatEmoji[];
	clientMessages?: ClientMessages;
	viewerName?: string;
};