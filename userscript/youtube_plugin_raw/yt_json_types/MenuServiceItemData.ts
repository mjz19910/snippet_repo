type MenuServiceItem<T extends string>={
	text: D$TextWithRuns;
	icon?: Icon<T>;
	serviceEndpoint: MenuServiceEndpointItems;
	trackingParams: string;
	hasSeparator?: true;
};