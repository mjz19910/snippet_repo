type D_WebPlayerActionsPorting={
	getSharePanelCommand: E_WebPlayerShareEntityService;
	subscribeCommand: E_Subscribe;
	unsubscribeCommand: E_Unsubscribe;
	addToWatchLaterCommand: E_PlaylistEdit;
	removeFromWatchLaterCommand: E_PlaylistEdit;
};
type D_WebPlayerConfig={
	useCobaltTvosDash: true;
	webPlayerActionsPorting: D_WebPlayerActionsPorting;
};