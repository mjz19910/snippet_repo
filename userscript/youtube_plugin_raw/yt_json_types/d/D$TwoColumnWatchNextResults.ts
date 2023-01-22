type D_TwoColumnWatchNextResults={
	results: T$ResultsTemplate<T$AR_Contents<WatchResultItem>>;
	secondaryResults: T$SecondaryResults<SecondaryContentsItem|SecondaryResultsItem<R_CompactVideo, "sid-wn-chips", "watch-next-feed">>;
	playlist?: T$Playlist<PlaylistContent>;
	autoplay?: T$Autoplay<AutoplayContent>;
	conversationBar?: ConversationBarTypes;
};