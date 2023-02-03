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
type D_Menu=
	|never
	|{
		items: R_MenuServiceItem[];
		accessibility: TD_Accessibility<"Action menu">;
		loggingDirectives: D_LoggingDirectives;
	}
	|{
		trackingParams: string;
		topLevelButtons: R_PlaylistLoopButton[];
	}
	|{
		items: R_MenuServiceItem[];
		trackingParams: string;
		accessibility: TD_Accessibility<"Action menu">;
		targetId: "watch-related-menu-button";
	}
	|{
		items: R_MenuServiceItem[];
		trackingParams: string;
		topLevelButtons: R_SegmentedLikeDislikeButton[];
		accessibility: TD_Accessibility<"More actions">;
		flexibleItems: R_MenuFlexibleItem[];
	}
	|{
		items: R_MenuServiceItem[];
		trackingParams: string;
		accessibility: TD_Accessibility<"Action menu">;
	};