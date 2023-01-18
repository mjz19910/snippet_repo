type ServiceEndpointTemplate<T extends {}>={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
}&T;