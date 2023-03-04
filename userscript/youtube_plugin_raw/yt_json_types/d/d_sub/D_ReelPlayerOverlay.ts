type D_ReelPlayerOverlay={
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
	reelPlayerNavigationModel?: "REEL_PLAYER_NAVIGATION_MODEL_UNSPECIFIED";
	shareButton: R_Button;
	pivotButton: R_PivotButton;
	multimixAttributionLabel?: R_ReelMultimixAttributionLabel;
	badge?: RMD_Badge;
};
type NoInfer<T>=T extends infer NoInferT? NoInferT:never;