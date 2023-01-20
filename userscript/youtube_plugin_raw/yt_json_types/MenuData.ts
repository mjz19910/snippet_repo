type MenuData={
	items?: (MenuServiceItemRenderer|{
		toggleMenuServiceItemRenderer: {
			defaultText: TextWithRuns;
			defaultIcon: Icon<"LIBRARY_ADD">;
			defaultServiceEndpoint: E$LikeEndpoint;
			toggledText: TextWithRuns;
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
	accessibility?: Accessibility;
	targetId?: string;
	loggingDirectives?: LoggingDirectives;
	flexibleItems?: {
		menuFlexibleItemRenderer: {};
	}[];
};