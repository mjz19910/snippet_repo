type ReelPlayerOverlayData={
	style: "REEL_PLAYER_OVERLAY_STYLE_SHORTS";
	trackingParams: string;
	reelPlayerNavigationModel: "REEL_PLAYER_NAVIGATION_MODEL_UNSPECIFIED";
}|{
	likeButton: {
		likeButtonRenderer: {
			target: {
				videoId: string;
			};
			likeStatus: "INDIFFERENT";
			likeCount: 44008;
			likeCountText: SimpleText;
			likeCountWithLikeText: SimpleText;
			likeCountWithUnlikeText: SimpleText;
			dislikeCountText: SimpleText;
			dislikeCountWithDislikeText: SimpleText;
			dislikeCountWithUndislikeText: SimpleText;
			trackingParams: string;
			likesAllowed: true;
			serviceEndpoints: {
				clickTrackingParams: string;
				commandMetadata: CommandMetadata;
				likeEndpoint: {};
			}[];
			likeCountTooltipText: TextWithRuns;
			dislikeCountTooltipText: TextWithRuns;
		};
	};
	reelPlayerHeaderSupportedRenderers: {
		reelPlayerHeaderRenderer: {};
	};
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
type PivotButton={
	thumbnail: Thumbnail;
	onClickCommand: BrowseEndpoint;
	trackingParams: string;
	contentDescription: SimpleText;
	soundAttributionTitle: TextWithRuns;
};

type PivotButtonRenderer={
	pivotButtonRenderer: PivotButton;
};