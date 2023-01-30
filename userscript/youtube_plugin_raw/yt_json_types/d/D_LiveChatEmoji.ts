type D_LiveChatEmoji={
	emojiId: `UC${string}/${string}`;
	shortcuts: `:${string}:`[];
	searchTerms: string[];
	image: D_EmojiImage;
	isCustomEmoji: boolean;
	isLocked: boolean;
};