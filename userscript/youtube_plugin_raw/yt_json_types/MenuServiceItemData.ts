type MenuServiceItemData={
	text: TextWithRuns;
	icon: Icon<"NOT_INTERESTED">;
	serviceEndpoint: ServiceEndpointTemplate<FeedbackEndpointPlugin>;
	trackingParams: string;
};