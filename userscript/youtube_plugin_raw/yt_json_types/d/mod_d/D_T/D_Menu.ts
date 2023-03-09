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
type D_Menu_WithItems={
	items: R_MenuServiceItem[];
	trackingParams: string;
	accessibility: TD_Accessibility<"Action menu">;
	menuPopupAccessibility: TD_Label<"List of menu actions">;
}|{
	items: R_MenuServiceItem[];
}|{
	items: R_MenuServiceItem[];
	trackingParams: string;
	accessibility: TD_Accessibility<"Action menu">;
	loggingDirectives: D_LoggingDirectives;
}|{
	items: R_MenuServiceItem[];
	trackingParams: string;
	topLevelButtons: R_Button[];
	accessibility: TD_Accessibility<"Action menu">;
}|{
	items: (R_MenuNavigationItem|R_MenuServiceItem)[];
	trackingParams: string;
}|{
	items: R_MenuServiceItem[];
	trackingParams: string;
	topLevelButtons: (R_SegmentedLikeDislikeButton|R_Button)[];
	accessibility: TD_Accessibility<"More actions">;
	flexibleItems: R_MenuFlexibleItem[];
}|{
	items: R_MenuServiceItem[];
	trackingParams: string;
	accessibility: TD_Accessibility<"Action menu">;
};
type D_Menu_WithTargetId=|{
	items: R_MenuServiceItem[];
	trackingParams: string;
	accessibility: TD_Accessibility<"Action menu">;
	targetId: "browse-video-menu-button";
}|{
	items: (R_MenuServiceItem|R_MenuNavigationItem)[];
	trackingParams: string;
	topLevelButtons: R_Button[];
	accessibility: TD_Accessibility<"Action menu">;
	targetId: "playlist-browse-action-menu";
}|{
	items: R_MenuServiceItem[];
	trackingParams: string;
	accessibility: TD_Accessibility<"Action menu">;
	targetId: "watch-related-menu-button";
}|{
	items: R_MenuServiceItem[];
	trackingParams: string;
	topLevelButtons: (R_PlaylistLoopButton|R_SegmentedLikeDislikeButton)[];
	accessibility: D_Accessibility;
	menuPopupAccessibility: TD_Label<"List of menu actions">;
	flexibleItems: R_MenuFlexibleItem[];
	loggingDirectives: D_LoggingDirectives;
	targetId: "browse-video-menu-button";
}|{
	items: (R_MenuNavigationItem|R_MenuServiceItem)[];
	trackingParams: string;
	accessibility: TD_Accessibility<"Action menu">;
	targetId: "playlist-browse-action-menu";
};
type D_Menu=D_Menu_WithItems|D_Menu_WithTargetId|{
	trackingParams: string;
	topLevelButtons: (R_PlaylistLoopButton|R_ToggleButton)[];
};
type R_MenuPopup={menuPopupRenderer: D_MenuPopup;};
type D_MenuPopup={items: R_MenuServiceItem[];};
