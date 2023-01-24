type D_TwoColumnWatchNextResults={
	results: T_Results<Record<"contents",WatchResultItem[]>>;
	secondaryResults: T$SecondaryResults<SecondaryContentsItem|SecondaryResultsItem<R_CompactVideo, "sid-wn-chips", "watch-next-feed">>;
	playlist?: T$Playlist<PlaylistContent>;
	autoplay?: T_Autoplay<AutoplayContent>;
	conversationBar?: ConversationBarTypes;
};