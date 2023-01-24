type D_TwoColumnWatchNextResults={
	results: T_Results<Record<"contents",G_WatchResultItem[]>>;
	secondaryResults: T_SecondaryResults<G_SecondaryContentsItem|TG_SecondaryResultsItem<R_CompactVideo, "sid-wn-chips", "watch-next-feed">>;
	playlist?: T_Playlist<PlaylistContent>;
	autoplay?: T_Autoplay<AutoplayContent>;
	conversationBar?: G_ConversationBar;
};