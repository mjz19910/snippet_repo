type D_ToggleMenuServiceItem={
	defaultText: R_TextRuns;
	defaultIcon: T_Icon<"LIBRARY_ADD">;
	defaultServiceEndpoint: E_Like;
	toggledText: R_TextRuns;
	toggledIcon: T_Icon<"LIBRARY_REMOVE">;
	toggledServiceEndpoint: E_Like;
	trackingParams: string;
	isToggled: boolean;
};