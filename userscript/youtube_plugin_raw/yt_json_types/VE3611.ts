namespace VE3611 {
	export type VE3611_WebCommandMetadata={
		url: `/channel/UC${string}`;
		webPageType: "WEB_PAGE_TYPE_CHANNEL";
		rootVe: 3611;
		apiUrl: "/youtubei/v1/browse";
	};
	export type VE3611_CommandMetadata={
		webCommandMetadata: VE3611_WebCommandMetadata;
	};
	export type VE3611_NavigationEndpoint={
		clickTrackingParams: string;
		commandMetadata: VE3611_CommandMetadata;
		browseEndpoint: BrowseEndpointData;
	};
}
type VE3611_CommandMetadata={
	webCommandMetadata: VE3611_WebCommandMetadata;
};
type VE3611_NavigationEndpoint={
	clickTrackingParams: string;
	commandMetadata: VE3611_CommandMetadata;
	browseEndpoint: BrowseEndpointData;
};