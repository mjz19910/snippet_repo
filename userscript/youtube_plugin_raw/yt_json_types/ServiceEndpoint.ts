type ServiceEndpoint<T extends {}>={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
}&T;