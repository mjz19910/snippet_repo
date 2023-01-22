type EndpointTemplate<T extends {}>={
	clickTrackingParams: string;
	commandMetadata: G$Metadata;
}&T;