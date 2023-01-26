type DE_Subscribe={
	channelIds: string[];
	params: string;
};
type E_Subscribe={
	clickTrackingParams: string;
	commandMetadata: {webCommandMetadata: GM_subscription_subscribe;};
	subscribeEndpoint: DE_Subscribe;
};