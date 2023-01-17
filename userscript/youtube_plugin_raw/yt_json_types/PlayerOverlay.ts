type PlayerOverlay={
	endScreen: WatchNextEndScreenRenderer;
	autoplay?: PlayerOverlayAutoplayRenderer;
	shareButton: ButtonRenderer;
	addToMenu: MenuRenderer;
	videoDetails: PlayerOverlayVideoDetailsRenderer;
	autonavToggle?: AutoplaySwitchButtonRenderer;
	decoratedPlayerBarRenderer?: DecoratedPlayerBarRenderer;
}|BrowserMediaSessionRoot;