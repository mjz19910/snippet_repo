type E_Subscribe={
	clickTrackingParams: string;
	commandMetadata: {
		webCommandMetadata: GM_subscription_subscribe;
	};
	subscribeEndpoint: {
		channelIds: string[];
		params: string;
	};
};