type DC_ShowReelsCommentsOverlay={engagementPanel: R_EngagementPanelSectionList;};
type C_ShowReelsCommentsOverlay={clickTrackingParams: string; showReelsCommentsOverlayCommand: DC_ShowReelsCommentsOverlay;};
type D_Button_NavEP=E_VE23462|E_ShareEntityService|E_VE83769_Url|E_Watch;
type D_Button_style=
	|"STYLE_BLUE_TEXT"
	|"STYLE_DEFAULT"
	|"STYLE_MONO_FILLED_OVERLAY"
	|"STYLE_MONO_TONAL_OVERLAY"
	|"STYLE_OPACITY"
	|"STYLE_PRIMARY"
	|"STYLE_SUGGESTIVE"
	|"STYLE_TEXT"
	;
;
type D_Button_targetId=
	|"sponsorships-button"
	|"create-clip-button-action-bar"
	|"clip-info-button"
	|"watch-supervod-button"
	;
;
// cSpell:ignoreRegExp /(?<=")[^"]{40,}/
type D_Button={
	style?: D_Button_style;
	size?: "SIZE_DEFAULT";
	isDisabled?: false;
	serviceEndpoint?: D_Button_SE;
	text?: G_Text;
	icon?: T_Icon<"SHORTS_COMMENT">;
	navigationEndpoint?: D_Button_NavEP;
	accessibility?: D_Label;
	tooltip?: string;
	trackingParams?: string;
	hint?: R_Hint;
	iconPosition?: "BUTTON_ICON_POSITION_TYPE_LEFT_OF_TEXT";
	accessibilityData?: D_Accessibility;
	targetId?: D_Button_targetId;
	command?: C_ShowReelsCommentsOverlay|A_ChangeEngagementPanelVisibility;
};
type D_Button_Gen={
	icon: T_Icon<"SHORTS_SHARE">;
	text: G_Text;
};

type R_Button={buttonRenderer: D_Button;};