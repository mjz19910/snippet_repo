type ServiceEndpointTemplate<T extends {}>={
	clickTrackingParams: string;
	commandMetadata: WebCommandMetadata;
}&T;