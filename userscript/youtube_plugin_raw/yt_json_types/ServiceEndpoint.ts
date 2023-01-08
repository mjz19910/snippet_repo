type ServiceEndpoint<T extends {}>={
	clickTrackingParams: string;
	commandMetadata: CommandMetadataTemplate;
}&T;