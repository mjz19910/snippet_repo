type E$SubscribeEndpoint={
	clickTrackingParams: string;
	commandMetadata: {
		webCommandMetadata: {
			sendPost: true;
			apiUrl: "/youtubei/v1/subscription/subscribe";
		};
	};
	subscribeEndpoint: {
		channelIds: string[];
		params: string;
	};
};
