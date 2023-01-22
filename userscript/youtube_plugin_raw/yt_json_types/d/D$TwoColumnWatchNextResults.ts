type D_TwoColumnWatchNextResults={
	results: T$ResultsTemplate<T$AR_Contents<WatchResultItem>>;
	secondaryResults: T$SecondaryResults<SecondaryContentsItem|SecondaryResultsItem>;
	playlist?: T$Playlist<PlaylistContent>;
	autoplay?: T$Autoplay<AutoplayContent>;
	conversationBar?: ConversationBarTypes;
};