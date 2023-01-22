type D_RatingSurveyOption={
	responseText: R_TextWithRuns;
	defaultStateIcon: T_Icon<"STAR_BORDER">;
	onStateIcon: T_Icon<"STAR">;
	followUpCommand: FollowUpCommand;
	responseEndpoint: {};
	trackingParams: string;
	checked: boolean;
	selected: boolean;
};