type DC_ShowReelsCommentsOverlay={engagementPanel: R_EngagementPanelSectionList;};
type C_ShowReelsCommentsOverlay={clickTrackingParams: string; showReelsCommentsOverlayCommand: DC_ShowReelsCommentsOverlay;};
type D_Button_style=
	|"STYLE_BLUE_TEXT"
	|"STYLE_DEFAULT"
	|"STYLE_LIGHT_TEXT"
	|"STYLE_MONO_FILLED_OVERLAY"
	|"STYLE_MONO_TONAL_OVERLAY"
	|"STYLE_OPACITY"
	|"STYLE_PRIMARY"
	|"STYLE_SUGGESTIVE"
	|"STYLE_TEXT"
	;
;
type W_Some_r=Some_A<W_Some_s>;
type W_Some_f=T_Str_Some<W_Some_s>;
type W_Some_s=`https://www.youtube.com/channel/UC${string}/join`|`https://www.youtube.com/${string}`;
type W_Some_e="https://www.youtube.com/channel/UC";
type Some_t1<S extends string>=[T_Split<S,""> extends [any,...infer L]? L["length"]:0];
type Some_t<T extends string>=T extends `${infer S}${infer X}`? [
	T_Split<S,""> extends [any,...infer L]? L["length"]:0,
	X,
]:never;
type Some_A<T extends string,A extends any[]=[]>=
	T extends `${infer S}${infer E}`?
	Some_t<T> extends infer V extends [any,any]?
	Some_A<E,[...A,[S,V[0]]]>
	:A
	:A;
;

type T_Str_Some<T extends string>=Some_t<T>[0] extends 0? "":T extends `${infer S}${infer E}`? `${S}${T_Str_Some<E>}`:T;
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
	isDisabled?: boolean;
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