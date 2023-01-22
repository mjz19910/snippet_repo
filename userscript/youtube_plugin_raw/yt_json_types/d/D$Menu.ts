type D_Menu={
	items?: G_Menu$items$iterate[];
	trackingParams: string;
	topLevelButtons?: R_SegmentedLikeDislikeButton[];
	accessibility?: D_Accessibility;
	targetId?: D_Menu$targetId;
	loggingDirectives?: A_LoggingDirectives;
	flexibleItems?: R_MenuFlexibleItem[];
};
type D_Menu$targetId="browse-video-menu-button";