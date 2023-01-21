type D$TwoColumnWatchNextResults={
	results: ResultsTemplate<ContentsArrayTemplate<WatchResultItem>>;
	secondaryResults: SecondaryResultsTemplate<SecondaryContentsItem|SecondaryResultsItem>;
	playlist?: PlaylistTemplate<PlaylistContent>;
	autoplay?: T$AutoplayTemplate<AutoplayContent>;
	conversationBar?: ConversationBarTypes;
};