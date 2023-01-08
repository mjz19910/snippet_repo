type ServiceEndpoint<T extends {},U extends keyof VEMap>={
	clickTrackingParams: string;
	commandMetadata: CommandMetadataTemplate<U>;
}&T;