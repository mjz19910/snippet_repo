type MenuServiceItemData={
	text: TextWithRuns;
	icon?: Icon<"NOT_INTERESTED">;
	serviceEndpoint: MenuServiceEndpointItems;
	trackingParams: string;
	hasSeparator?: true;
};