type D_Menu_old={
	items?: G_MenuItem[];
	trackingParams: string;
	topLevelButtons?: (R_PlaylistLoopButton|R_Button|R_SegmentedLikeDislikeButton)[];
	accessibility?: D_Accessibility;
	targetId?: D_Menu_TargetId;
	loggingDirectives?: D_LoggingDirectives;
	flexibleItems?: R_MenuFlexibleItem[];
};
type D_Menu={
	items: R_MenuServiceItem[];
	trackingParams: string;
	accessibility: TD_Accessibility<"Action menu">;
	targetId: "watch-related-menu-button";
};