type EndpointTemplate<T extends {}>={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
}&T;