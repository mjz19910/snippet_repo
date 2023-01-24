type D_ReelPlayerOverlay={
	style: "REEL_PLAYER_OVERLAY_STYLE_SHORTS";
	trackingParams: string;
	reelPlayerNavigationModel: "REEL_PLAYER_NAVIGATION_MODEL_UNSPECIFIED";
}|{
	likeButton: R_LikeButton;
	reelPlayerHeaderSupportedRenderers: R_ReelPlayerHeader;
	menu: R_Menu;
	nextItemButton: R_Button;
	prevItemButton: R_Button;
	subscribeButtonRenderer: R_SubscribeButton;
	style: "REEL_PLAYER_OVERLAY_STYLE_SHORTS";
	viewCommentsButton: R_Button;
	videoInteractions?: {};
	trackingParams: string;
	shareButton: R_Button;
	pivotButton: R_PivotButton;
	badge: RMD_Badge;
};
