type AddChatItemActionData={
	item: LiveChatItem;
	clientId: string;
};
type LiveChatItem=LiveChatTextMessageRenderer|LiveChatPlaceholderItemRenderer;