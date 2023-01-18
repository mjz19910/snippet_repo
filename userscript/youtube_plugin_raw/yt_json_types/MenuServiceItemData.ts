type MenuServiceEndpoints=FeedbackEndpointPlugin|PlaylistEditEndpoint;

type MenuServiceEndpointItems=ServiceEndpointTemplate<MenuServiceEndpoints>;

type MenuServiceItemData={
	text: TextWithRuns;
	icon: Icon<"NOT_INTERESTED">;
	serviceEndpoint: MenuServiceEndpointItems;
	trackingParams: string;
};