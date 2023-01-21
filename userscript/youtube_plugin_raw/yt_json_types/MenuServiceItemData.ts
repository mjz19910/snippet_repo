type MenuServiceItem<T extends string>={
	text: D$TextT;
	icon?: Icon<T>;
	serviceEndpoint: MenuServiceEndpointItems;
	trackingParams: string;
	hasSeparator?: true;
};