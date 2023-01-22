type D$MenuServiceItem<T extends string,EndpointItems>={
	text: G$Text;
	icon?: T$Icon<T>;
	serviceEndpoint: G$MenuServiceEndpointItems<EndpointItems>;
	trackingParams: string;
	hasSeparator?: true;
	loggingDirectives?: A$LoggingDirectives;
};