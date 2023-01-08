type NavigationEndpoint<T>=T&{
	clickTrackingParams: string;
	commandMetadata: CommandMetadataTemplate;
};
