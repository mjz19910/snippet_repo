type DC_ShowReelsCommentsOverlay={engagementPanel: R_EngagementPanelSectionList;};
type C_ShowReelsCommentsOverlay={clickTrackingParams: string; showReelsCommentsOverlayCommand: DC_ShowReelsCommentsOverlay;};
type D_Button_navigationEndpoint=GE_Browse|E_ShareEntityService|E_Url|E_Watch;
type D_Button_style=
	|"STYLE_BLUE_TEXT"
	|"STYLE_DEFAULT"
	|"STYLE_OPACITY"
	|"STYLE_PRIMARY"
	|"STYLE_SUGGESTIVE"
	|"STYLE_TEXT"
	;
;
type D_Button_targetId="create-clip-button-action-bar"|"clip-info-button";
// cSpell:ignoreRegExp /(?<=")[^"]{40,}/
type D_Button={
	style?: D_Button_style;
	size?: "SIZE_DEFAULT";
	isDisabled?: false;
	serviceEndpoint?: D_Button_SE;
	text?: G_Text;
	icon?: T_Icon<"SHORTS_COMMENT">;
	navigationEndpoint?: D_Button_navigationEndpoint;
	accessibility?: D_Label;
	tooltip?: string;
	trackingParams: string;
	iconPosition?: "BUTTON_ICON_POSITION_TYPE_LEFT_OF_TEXT";
	accessibilityData?: D_Accessibility;
	targetId?: D_Button_targetId;
	command?: C_ShowReelsCommentsOverlay|A_ChangeEngagementPanelVisibility;
};

type R_Button={buttonRenderer: D_Button;};