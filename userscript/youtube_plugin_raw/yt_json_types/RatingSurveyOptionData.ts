type RatingSurveyOptionData={
	responseText: D$TextWithRuns;
	defaultStateIcon: T$Icon<"STAR_BORDER">;
	onStateIcon: T$Icon<"STAR">;
	followUpCommand: FollowUpCommand;
	responseEndpoint: {};
	trackingParams: string;
	checked: boolean;
	selected: boolean;
};