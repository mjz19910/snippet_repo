type ReelPlayerHeaderRenderer={
	reelPlayerHeaderRenderer: {};
};

type ReelPlayerOverlayData={
	style: "REEL_PLAYER_OVERLAY_STYLE_SHORTS";
	trackingParams: string;
	reelPlayerNavigationModel: "REEL_PLAYER_NAVIGATION_MODEL_UNSPECIFIED";
}|{
	likeButton: LikeButtonRenderer;
	reelPlayerHeaderSupportedRenderers: ReelPlayerHeaderRenderer;
	menu: MenuRenderer;
	nextItemButton: ButtonRenderer;
	prevItemButton: ButtonRenderer;
	subscribeButtonRenderer: SubscribeButtonRenderer;
	style: "REEL_PLAYER_OVERLAY_STYLE_SHORTS";
	viewCommentsButton: ButtonRenderer;
	videoInteractions?: {};
	trackingParams: string;
	shareButton: ButtonRenderer;
	pivotButton: PivotButtonRenderer;
	badge: MetadataBadgeRenderer;
};

