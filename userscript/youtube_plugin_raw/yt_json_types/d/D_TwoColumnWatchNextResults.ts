type D_TwoColumnWatchNextResults={
	results: T_Results<Record<"contents",G_WatchResultItem[]>>;
	secondaryResults: 
	|T_SecondaryResults<Record<"contents",G_SecondaryContentsItem[]>>
	|Record<"results",G_SecondaryResultsItem<R_CompactVideo,"sid-wn-chips","watch-next-feed">[]>&{trackingParams: string;};
	playlist?: T_Playlist<PlaylistContent>;
	autoplay?: T_Autoplay<AutoplayContent>;
	conversationBar?: G_ConversationBar;
};