type D_Menu={
	items?: G_MenuItem[];
	trackingParams: string;
	topLevelButtons?: (R_Button|R_SegmentedLikeDislikeButton)[];
	accessibility?: D_Accessibility;
	targetId?: D_Menu_TargetId;
	loggingDirectives?: D_LoggingDirectives;
	flexibleItems?: R_MenuFlexibleItem[];
};