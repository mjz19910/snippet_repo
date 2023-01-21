type D$MenuServiceItem<T extends string>={
	text: D$TextT;
	icon?: Icon<T>;
	serviceEndpoint: G$MenuServiceEndpointItems;
	trackingParams: string;
	hasSeparator?: true;
	loggingDirectives?: A$LoggingDirectives;
};