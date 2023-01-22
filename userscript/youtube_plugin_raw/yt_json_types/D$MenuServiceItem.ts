type D$MenuServiceItem<T extends string,EndpointItems>={
	text: D$TextT;
	icon?: T$Icon<T>;
	serviceEndpoint: G$MenuServiceEndpointItems<EndpointItems>;
	trackingParams: string;
	hasSeparator?: true;
	loggingDirectives?: A$LoggingDirectives;
};