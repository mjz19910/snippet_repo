type D_Menu_Button=
	|R_PlaylistLoopButton
	|R_Button
	|R_ToggleButton
	|R_SegmentedLikeDislikeButton
	;
;
type D_Menu_old={
	items?: G_MenuItem[];
	trackingParams: string;
	topLevelButtons?: (D_Menu_Button)[];
	accessibility?: D_Accessibility;
	targetId?: "browse-video-menu-button";
	loggingDirectives?: D_LoggingDirectives;
	flexibleItems?: R_MenuFlexibleItem[];
};
type D_Menu={
	items?: R_MenuServiceItem[];
	trackingParams?: string;
	topLevelButtons?: (R_PlaylistLoopButton|R_SegmentedLikeDislikeButton)[];
	accessibility?: D_Accessibility;
	menuPopupAccessibility?: TD_Label<"List of menu actions">;
	flexibleItems?: R_MenuFlexibleItem[];
}|{
	items?: R_MenuServiceItem[];
	trackingParams?: string;
	topLevelButtons?: (R_PlaylistLoopButton|R_SegmentedLikeDislikeButton)[];
	accessibility?: D_Accessibility;
	menuPopupAccessibility?: TD_Label<"List of menu actions">;
	flexibleItems?: R_MenuFlexibleItem[];
	targetId: D_Menu_TargetId;
}|{
	items?: R_MenuServiceItem[];
	trackingParams?: string;
	topLevelButtons?: (R_PlaylistLoopButton|R_SegmentedLikeDislikeButton)[];
	accessibility?: D_Accessibility;
	menuPopupAccessibility?: TD_Label<"List of menu actions">;
	flexibleItems?: R_MenuFlexibleItem[];
	loggingDirectives: D_LoggingDirectives;
}|{
	items?: R_MenuServiceItem[];
	trackingParams?: string;
	topLevelButtons?: (R_PlaylistLoopButton|R_SegmentedLikeDislikeButton)[];
	accessibility?: D_Accessibility;
	menuPopupAccessibility?: TD_Label<"List of menu actions">;
	flexibleItems?: R_MenuFlexibleItem[];
	loggingDirectives: D_LoggingDirectives;
	targetId: D_Menu_TargetId;
}|{
	items: R_MenuNavigationItem[];
	trackingParams: string;
	accessibility: TD_Accessibility<"Action menu">;
	targetId: "playlist-browse-action-menu";
};