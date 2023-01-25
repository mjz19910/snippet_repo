type D_TwoColumnWatchNextResults={
	results: T_Results<Record<"contents",G_WatchResultItem[]>>;
	secondaryResults: T_SecondaryResults<G_Watch_SecondaryResults>;
	playlist?: T_Playlist<PlaylistContent>;
	autoplay?: T_Autoplay<AutoplayContent>;
	conversationBar?: G_ConversationBar;
};