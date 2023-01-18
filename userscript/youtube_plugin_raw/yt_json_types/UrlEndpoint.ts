type VE83769_WebCommandMetadata={
	url: string;
	webPageType: "WEB_PAGE_TYPE_UNKNOWN";
	rootVe: 83769;
};

type UrlEndpointCommandMetadata={
	webCommandMetadata: VE83769_WebCommandMetadata;
};

type UrlEndpoint={
	clickTrackingParams?: string;
	commandMetadata: UrlEndpointCommandMetadata;
	urlEndpoint: UrlEndpointData;
};
