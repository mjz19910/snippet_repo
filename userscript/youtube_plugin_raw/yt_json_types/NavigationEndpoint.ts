type NavigationEndpoint<T,U extends keyof VEMap>=T&{
	clickTrackingParams: string;
	commandMetadata: CommandMetadataTemplate<U>;
};
