type R_Button={buttonRenderer: D_Button;};
type D_ClipInfoButton={
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	isDisabled: false;
	icon: T_Icon<"INFO">;
	trackingParams: string;
	accessibilityData: D_Accessibility;
	targetId: "clip-info-button";
	command: TA_OpenPopup<{
		popup: R_ConfirmDialog;
		popupType: "DIALOG";
	}>;
};

type D_Button_1={
	style: "STYLE_TEXT";
	size: "SIZE_DEFAULT";
	isDisabled: false;
	icon: T_Icon<"NOTIFICATIONS_ACTIVE">;
	accessibility: D_Label;
	trackingParams: string;
	accessibilityData: D_Accessibility;
};

type D_ShareButton={
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	isDisabled: false;
	text: G_Text;
	// D_Button_SE
	serviceEndpoint: E_ShareEntityService;
	icon: T_Icon<"SHARE">;
	tooltip: "Share";
	trackingParams: string;
	accessibilityData: D_Accessibility;
};
type D_Button_TODO={
	navigationEndpoint: GE_Button_navigation;
}|{
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	text: G_Text;
	icon: Exclude<D_Icon_Button,T_Icon<"CONTENT_CUT">>;
	tooltip: string;
	trackingParams: string;
	accessibilityData: D_Accessibility;
};
type D_CreateClipButton={
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	isDisabled: false;
	text: G_Text;
	icon: T_Icon<"CONTENT_CUT">;
	tooltip: "Clip";
	trackingParams: string;
	accessibilityData: D_Accessibility;
	targetId: "create-clip-button-action-bar";
	command: A_ChangeEngagementPanelVisibility;
};

type D_SuggestiveButton={
	style: "STYLE_SUGGESTIVE";
	size: "SIZE_DEFAULT";
	isDisabled: false;
	text: G_Text;
	trackingParams: string;
	command: C_Continuation;
};

type D_PlaylistAddButton_Save={
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	isDisabled: false;
	text: G_Text;
	icon: T_Icon<"PLAYLIST_ADD">;
	accessibility: {};
	tooltip: "Save";
	trackingParams: string;
	accessibilityData: D_Accessibility;
	command: E_AddToPlaylistService;
};

type D_PlaylistAddButton_Clip={
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	isDisabled: false;
	text: G_Text;
	icon: T_Icon<"PLAYLIST_ADD">;
	accessibility: {
		label: "Save to";
	};
	tooltip: "Clip";
	trackingParams: string;
	accessibilityData: D_Accessibility;
	command: E_AddToPlaylistService;
};

type D_Button=
	|D_ClipInfoButton
	|D_Button_1
	|D_ShareButton
	|D_CreateClipButton
	|D_SuggestiveButton
	|D_PlaylistAddButton_Save
	|D_PlaylistAddButton_Clip
	;
;
