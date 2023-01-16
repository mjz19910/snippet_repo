type VideoQualityPromoData={
	triggerCriteria: TriggerCriteria;
	text: TextWithRuns;
	endpoint: EndpointTemplate<UrlEndpointPlugin>;
	trackingParams: string;
	snackbar: NotificationActionRenderer;
};