type D_RatingSurveyOption={
	responseText: D_Text;
	defaultStateIcon: T_Icon<"STAR_BORDER">;
	onStateIcon: T_Icon<"STAR">;
	followUpCommand: C_FollowUp;
	responseEndpoint: {};
	trackingParams: string;
	checked: boolean;
	selected: boolean;
};