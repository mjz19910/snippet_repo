type TwoColumnWatchNextResultsData={
	results: ResultsTemplate<ContentsArrayTemplate<WatchResultItem>>;
	secondaryResults: SecondaryResultsTemplate<SecondaryContentsItem|SecondaryResultsItem>;
	playlist?: PlaylistTemplate<PlaylistContent>;
	autoplay?: AutoplayTemplate<AutoplayContent>;
	conversationBar?: ConversationBarTypes;
};