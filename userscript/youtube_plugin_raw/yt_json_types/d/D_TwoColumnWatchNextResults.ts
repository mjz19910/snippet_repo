type D_TwoColumnWatchNextResults={
	results: T_Results<G_Watch_ResultsItem>;
	secondaryResults: T_SecondaryResults<G_Watch_SecondaryResults>;
	playlist?: T_Playlist<D_PlaylistContent>;
	autoplay?: T_Autoplay<D_AutoplayContent>;
	conversationBar?: G_ConversationBar;
};
