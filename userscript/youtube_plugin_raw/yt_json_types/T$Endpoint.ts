type EndpointTemplate<T extends {}>={
	clickTrackingParams: string;
	commandMetadata: M$CommandMetadata;
}&T;