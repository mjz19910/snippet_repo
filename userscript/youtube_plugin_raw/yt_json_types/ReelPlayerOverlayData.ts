type ReelPlayerOverlayData={
	style: "REEL_PLAYER_OVERLAY_STYLE_SHORTS";
	trackingParams: string;
	reelPlayerNavigationModel: "REEL_PLAYER_NAVIGATION_MODEL_UNSPECIFIED";
}|{
	likeButton: R$LikeButton;
	reelPlayerHeaderSupportedRenderers: ReelPlayerHeaderRenderer;
	menu: R$Menu;
	nextItemButton: R$Button;
	prevItemButton: R$Button;
	subscribeButtonRenderer: SubscribeButtonRenderer;
	style: "REEL_PLAYER_OVERLAY_STYLE_SHORTS";
	viewCommentsButton: R$Button;
	videoInteractions?: {};
	trackingParams: string;
	shareButton: R$Button;
	pivotButton: PivotButtonRenderer;
	badge: R$MetadataBadgeRenderer;
};

