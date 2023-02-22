type D_ReasonItem={
	reason: G_Text;
	endpoint: E_Pinging;
};

type DE_MuteAd={
	type: "HIDE";
	actions: A_HideEnclosing[];
};


type D_AdFeedback={
	title: G_Text;
	confirmLabel: G_Text;
	cancelLabel: G_Text;
	reasons: D_ReasonItem[];
	completionMessage: G_Text;
	trackingParams: string;
	impressionEndpoint: E_MuteAd;
};

type R_AdFeedback={adFeedbackRenderer: D_AdFeedback;};
type D_MenuNavigationItem={
	text: G_Text;
	icon?: T_Icon<"INFO"|"FEEDBACK">;
	navigationEndpoint: E_UserFeedback|TA_OpenPopup_Empty|E_AdFeedback;
	trackingParams: string;
	accessibility?: TD_Accessibility<"Send feedback">;
};
