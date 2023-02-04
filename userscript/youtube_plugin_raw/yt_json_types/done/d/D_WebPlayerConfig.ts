type D_WebPlayerConfig={
	useCobaltTvosDash: true;
	webPlayerActionsPorting: {
		getSharePanelCommand: E_WebPlayerShareEntityService;
		subscribeCommand: E_Subscribe;
		unsubscribeCommand: E_Unsubscribe;
		addToWatchLaterCommand: E_PlaylistEdit;
		removeFromWatchLaterCommand: E_PlaylistEdit;
	};
};
