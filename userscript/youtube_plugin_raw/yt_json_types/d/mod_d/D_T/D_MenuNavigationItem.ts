type D_MenuNavigationItem={
	text: G_Text;
	icon?: T_Icon<"INFO"|"FEEDBACK">;
	navigationEndpoint: G_MenuNavigationItem_NavEP;
	trackingParams: string;
	accessibility?: TD_Accessibility<"Send feedback">;
};