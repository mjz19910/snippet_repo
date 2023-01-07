type NavigationEndpoint<T>=T&{
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
};
