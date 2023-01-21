type MenuData={
	items?: (MenuServiceItemRenderer|{
		toggleMenuServiceItemRenderer: {
			defaultText: D$TextWithRuns;
			defaultIcon: Icon<"LIBRARY_ADD">;
			defaultServiceEndpoint: E$LikeEndpoint;
			toggledText: D$TextWithRuns;
			toggledIcon: Icon<"LIBRARY_REMOVE">;
			toggledServiceEndpoint: E$LikeEndpoint;
			trackingParams: string;
			isToggled: boolean;
		};
	})[];
	trackingParams: string;
	topLevelButtons?: {
		segmentedLikeDislikeButtonRenderer: {
			likeButton: {
				toggleButtonRenderer: {};
			};
			dislikeButton: {};
		};
	}[];
	accessibility?: A$Accessibility;
	targetId?: string;
	loggingDirectives?: LoggingDirectives;
	flexibleItems?: {
		menuFlexibleItemRenderer: {};
	}[];
};