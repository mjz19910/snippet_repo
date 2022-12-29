type ChannelId=`UC${string}`;
export type ChannelResponse={
	page: "channel";
	endpoint: {};
	response: {
		responseContext: {};
		contents: {};
		header: {};
		metadata: {};
		trackingParams: string;
		topbar: {};
		microformat: {};
		onResponseReceivedActions: {}[];
	};
	url: `/channel/${ChannelId}`;
};
