type D_EmojiPickerUpsellCategory={
	categoryId: D_ChannelId;
	title: G_Text;
	upsell: G_Text;
	emojiTooltip: "Join to unlock";
	command: E_YpcGetOffers;
	trackingParams: string;
	emojiIds: `UC${string}/${string}`[];
};