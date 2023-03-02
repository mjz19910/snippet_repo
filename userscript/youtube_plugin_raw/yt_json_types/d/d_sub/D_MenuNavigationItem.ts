type D_ReasonItem={
	reason: G_Text;
	endpoint: E_Pinging;
};

type D_MenuNavigationItem={
	text: G_Text;
	icon?: T_Icon<"INFO"|"FEEDBACK">;
	navigationEndpoint: E_UserFeedback|T_OpenPopup_Dialog<R_AboutThisAd>|E_AdFeedback;
	trackingParams: string;
	accessibility?: TD_Accessibility<"Send feedback">;
};
