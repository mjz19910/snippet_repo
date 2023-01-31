//#region String data, ie `D_${string}`
type D_EndpointLikeEndings="Endpoint"|"Command"|"Action";
//#endregion
//#region Enum data, ie `D_${string}`
type D_AddToOfflineButtonState=T_EnumStr<
	"ADD_TO_OFFLINE_BUTTON_STATE",[
		"UNKNOWN",
		"ENABLED"
	][number]
>;
//#endregion
//#region Entity data, ie `D_EY_${string}`
type D_EY_Offlineability={
	key: string;
	command: C_Innertube;
	addToOfflineButtonState: D_AddToOfflineButtonState;
	contentCheckOk: false;
	racyCheckOk: false;
	loggingDirectives: D_LoggingDirectives;
};
//#endregion
type D_AddToPlaylistCreate={
	openCreateLink: R_CompactLink;
	nameInput: R_TextInputFormField;
	privacyInput: R_Dropdown;
	createAction: R_Button;
	serviceEndpoint: SE_CreatePlaylist;
};
//#region Icons
type D_Icon_Button=T_Icon<DE_IconType_Button>;
//#endregion
//#region 
type D_Survey_Watch={watch: B_Hack;};
//#endregion
type D_ProfileColumn={items: G_ProfileColumnItem[];};
