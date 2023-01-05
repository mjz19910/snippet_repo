type InlineSurveyData={
	dismissalEndpoint: YtEndpoint;
	title: TextT;
	subtitle: TextT;
	inlineContent: CompactVideoRenderer;
	response: SurveyRendererResponse;
	trackingParams: string;
	dismissalText: TextT;
	impressionEndpoints: YtEndpoint[];
};
