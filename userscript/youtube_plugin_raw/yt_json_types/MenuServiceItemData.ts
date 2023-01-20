type MenuServiceItemData<T extends string>={
	text: TextWithRuns;
	icon?: Icon<T>;
	serviceEndpoint: MenuServiceEndpointItems;
	trackingParams: string;
	hasSeparator?: true;
};