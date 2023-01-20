type MenuData={
	items: MenuServiceItemRenderer[];
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