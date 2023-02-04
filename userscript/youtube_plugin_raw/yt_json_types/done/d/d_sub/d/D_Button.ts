type DC_ShowReelsCommentsOverlay={engagementPanel: R_EngagementPanelSectionList;};
type C_ShowReelsCommentsOverlay={clickTrackingParams: string; showReelsCommentsOverlayCommand: DC_ShowReelsCommentsOverlay;};

// cSpell:ignoreRegExp /(?<=")[^"]{40,}/
type D_Button={
	isDisabled: false;
	text: G_Text;
	icon: T_Icon<"SHORTS_COMMENT">;
	accessibility: D_Label;
	tooltip: string;
	trackingParams: string;
	accessibilityData: D_Accessibility;
	command: C_ShowReelsCommentsOverlay;
};

type R_Button={buttonRenderer: D_Button;};