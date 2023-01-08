type TwoColumnWatchNextResultsData={
	results: WatchNextResultsNS.RT;
	secondaryResults: WatchNextResultsNS.SR;
	playlist?: PlaylistTemplate<PlaylistContent>;
	autoplay?: AutoplayTemplate<AutoplayContent>;
	conversationBar?: ConversationBarTypes;
};