type InlineSurveyRendererData={
	dismissalEndpoint: YtEndpoint;
	title: YtTextType;
	subtitle: YtTextType;
	inlineContent: CompactVideoRenderer;
	response: SurveyRendererResponse;
	trackingParams: string;
	dismissalText: YtTextType;
	impressionEndpoints: YtEndpoint[];
};
