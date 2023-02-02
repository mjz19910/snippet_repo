type RD_MenuServiceItem=
|{
	text: G_Text;
	icon: T_Icon<"VISIBILITY_OFF">;
	serviceEndpoint: E_RecordNotificationInteractions;
	trackingParams: string;
	loggingDirectives: D_LoggingDirectives;
}
|{
	text: G_Text;
	icon: T_Icon<RD_MenuServiceIconType_1>;
	serviceEndpoint: G_SE_MenuService;
	trackingParams: string;
	hasSeparator?: true;
	isDisabled?: false;
};