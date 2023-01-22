type E_Subscribe={
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