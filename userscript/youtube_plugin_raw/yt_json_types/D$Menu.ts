type D$Menu={
	items?: (R$MenuServiceItem|R$ToggleMenuServiceItem)[];
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
	loggingDirectives?: A$LoggingDirectives;
	flexibleItems?: {
		menuFlexibleItemRenderer: {};
	}[];
};