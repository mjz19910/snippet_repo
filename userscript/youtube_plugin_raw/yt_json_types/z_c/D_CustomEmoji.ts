type D_CustomEmoji={
	emojiId: `UC${string}/${string}`;
	shortcuts: `:${string}:`[];
	searchTerms: string[];
	image: EmojiImage;
	isCustomEmoji: boolean;
};