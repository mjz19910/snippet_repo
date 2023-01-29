type RD_MenuServiceItem={
	text: D_Text;
	icon: T_Icon<RD_MenuServiceIconType_1>;
	serviceEndpoint: G_SE_MenuService;
	trackingParams: string;
	hasSeparator?: true;
	isDisabled?: false;
};