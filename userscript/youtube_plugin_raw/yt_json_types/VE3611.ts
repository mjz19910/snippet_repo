namespace VE3611 {
	export type webCommandMetadata={
		url: `/channel/UC${string}`;
		webPageType: "WEB_PAGE_TYPE_CHANNEL";
		rootVe: 3611;
		apiUrl: "/youtubei/v1/browse";
	};
	export type commandMetadata={
		webCommandMetadata: webCommandMetadata;
	};
	export type navigationEndpoint={
		clickTrackingParams: string;
		commandMetadata: commandMetadata;
		browseEndpoint: BrowseEndpointData;
	};
}