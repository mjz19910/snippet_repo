type D_MenuNavigationItem={
	text: G_Text;
	icon: T_Icon<"INFO">;
	navigationEndpoint: TA_OpenPopup_Empty;
	trackingParams: string;
}|{
	text: G_Text;
	icon: T_Icon<"FEEDBACK">;
	navigationEndpoint: E_UserFeedback;
	trackingParams: string;
	accessibility: TD_Accessibility<"Send feedback">;
}|{
	text: G_Text;
	navigationEndpoint: {
		clickTrackingParams: string;
		loggingUrls: T_BaseUrl<`https://googleads.g.doubleclick.net/pagead/interaction/?${string}`>[];
		adFeedbackEndpoint: D_Content;
	};
	trackingParams: string;
};
