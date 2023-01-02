type RatingSurveyOptionRendererData={
	responseText: YtTextType;
	defaultStateIcon: Icon<"STAR_BORDER">;
	onStateIcon: Icon<"STAR">;
	followUpCommand: FollowUpCommand;
	responseEndpoint: YtEndpoint;
	trackingParams: string;
	checked: boolean;
	selected: boolean;
};
