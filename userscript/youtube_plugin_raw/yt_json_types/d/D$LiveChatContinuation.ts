type D__LiveChatContinuation={
	continuations: G_LiveChatContinuationItem[];
	actions?: LiveChatContinuationActions[];
	actionPanel?: R_LiveChatMessageInput;
	itemList?: R_LiveChatItemList;
	header?: R_LiveChatHeader;
	ticker?: R_LiveChatTicker;
	trackingParams?: string;
	participantsList?: R_LiveChatParticipantsList;
	popoutMessage?: R_Message;
	emojis?: LiveChatEmoji[];
	clientMessages?: ClientMessages;
	viewerName?: string;
};