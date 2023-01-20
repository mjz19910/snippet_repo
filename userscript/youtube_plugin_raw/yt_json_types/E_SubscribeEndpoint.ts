type E_SubscribeEndpoint={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
	subscribeEndpoint: {
		channelIds: string[];
		params: string;
	};
};
