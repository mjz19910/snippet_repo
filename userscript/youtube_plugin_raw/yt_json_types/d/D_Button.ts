type D_Button=|
{
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	isDisabled: false;
	text: G_Text;
	serviceEndpoint: E_ShareEntityService;
	icon: T_Icon<"SHARE">;
	tooltip: "Share";
	trackingParams: string;
	accessibilityData: D_Accessibility;
}|{
	serviceEndpoint: D_Button_SE;
}|{
	accessibility: D_Label;
	navigationEndpoint: GE_Button_navigation;
}|{
	trackingParams: string;
	hint: R_Hint;
}|{	
	icon: D_Icon_Button;
	text: G_Text;
}|{
	command: GC_Button;
	targetId: D_Button_TargetId;
}|{
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
}|{
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	isDisabled: false;
	text: G_Text;
	icon: T_Icon<"PLAYLIST_ADD">;
	accessibility: {
		label: "Save to";
	};
	tooltip: "Save";
	trackingParams: string;
	accessibilityData: D_Accessibility;
	command: E_AddToPlaylistService;
};
type D_Button_SE=T_SE_Signal<M_SendPost,G_ClientSignal>|E_YpcGetOffers;
type E_ShareEntityService=TE_Endpoint_3<"shareEntityServiceEndpoint",{},{}>|{
	clickTrackingParams: string;
	commandMetadata: M_GetSharePanel;
	shareEntityServiceEndpoint: {
		serializedShareEntity: string;
		commands: TA_OpenPopup<T_DialogPopup_ReuseFlag<>|{
			popup: {};
			popupType: "Dialog"
		}>[];
	};
};