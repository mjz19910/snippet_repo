type PlayerOverlay={
	endScreen: WatchNextEndScreenRenderer;
	autoplay?: PlayerOverlayAutoplayRenderer;
	shareButton: R$Button;
	addToMenu: MenuRenderer;
	videoDetails: PlayerOverlayVideoDetailsRenderer;
	autonavToggle?: AutoplaySwitchButtonRenderer;
	decoratedPlayerBarRenderer?: DecoratedPlayerBarRenderer;
}|BrowserMediaSessionRoot;