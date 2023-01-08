namespace VE3611 {
	export type WebCommandMetadata={
		url: `/channel/UC${string}`;
		webPageType: "WEB_PAGE_TYPE_CHANNEL";
		rootVe: 3611;
		apiUrl: "/youtubei/v1/browse";
	};
	export type CommandMetadata={
		webCommandMetadata: WebCommandMetadata;
	};
	export type NavigationEndpoint={
		clickTrackingParams: string;
		commandMetadata: CommandMetadata;
		browseEndpoint: BrowseEndpointData;
	};
}