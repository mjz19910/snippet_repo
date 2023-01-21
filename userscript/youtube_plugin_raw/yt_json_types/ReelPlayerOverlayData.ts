type ReelPlayerHeaderRenderer={
	reelPlayerHeaderRenderer: {};
};

type ReelPlayerOverlayData={
	style: "REEL_PLAYER_OVERLAY_STYLE_SHORTS";
	trackingParams: string;
	reelPlayerNavigationModel: "REEL_PLAYER_NAVIGATION_MODEL_UNSPECIFIED";
}|{
	likeButton: R$LikeButton;
	reelPlayerHeaderSupportedRenderers: ReelPlayerHeaderRenderer;
	menu: R$MenuRenderer;
	nextItemButton: R$ButtonRenderer;
	prevItemButton: R$ButtonRenderer;
	subscribeButtonRenderer: SubscribeButtonRenderer;
	style: "REEL_PLAYER_OVERLAY_STYLE_SHORTS";
	viewCommentsButton: R$ButtonRenderer;
	videoInteractions?: {};
	trackingParams: string;
	shareButton: R$ButtonRenderer;
	pivotButton: PivotButtonRenderer;
	badge: R$MetadataBadgeRenderer;
};

