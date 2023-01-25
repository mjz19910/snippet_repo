type D_RatingSurveyOption={
	responseText: R_TextRuns;
	defaultStateIcon: T_Icon<"STAR_BORDER">;
	onStateIcon: T_Icon<"STAR">;
	followUpCommand: C_FollowUp;
	responseEndpoint: {};
	trackingParams: string;
	checked: boolean;
	selected: boolean;
};