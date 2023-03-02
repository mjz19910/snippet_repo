type D_MenuNavigationItem={
	text: G_Text;
	icon?: T_Icon<"INFO"|"FEEDBACK">;
	navigationEndpoint: E_UserFeedback|A_AboutThisAd|E_AdFeedback;
	trackingParams: string;
	accessibility?: TD_Accessibility<"Send feedback">;
};
