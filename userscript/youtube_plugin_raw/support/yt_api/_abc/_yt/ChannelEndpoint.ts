export type ChannelEndpoint={
	clickTrackingParams: string;
	browseEndpoint: {
		browseId: `UC${string}`;
		canonicalBaseUrl: `/@${string}`;
	};
	commandMetadata: {
		webCommandMetadata: {
			apiUrl: "/youtubei/v1/browse";
			rootVe: 3611;
			url: `/@${string}`;
			webPageType: "WEB_PAGE_TYPE_CHANNEL";
		};
	};
};
