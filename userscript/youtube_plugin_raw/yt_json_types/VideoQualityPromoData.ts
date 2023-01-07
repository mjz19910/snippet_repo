type VideoQualityPromoData={
	triggerCriteria: TriggerCriteria;
	text: TextT;
	endpoint: EndpointTemplate<UrlEndpointPlugin>;
	trackingParams: string;
	snackbar: NotificationActionRenderer;
};