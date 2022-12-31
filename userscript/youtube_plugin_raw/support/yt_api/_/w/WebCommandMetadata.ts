export type WebCommandMetadata={
	sendPost?: boolean;
	apiUrl?: string;
	rootVe?: number;
	url?: string;
	webPageType?: WebCommandPageType;
};
type WebCommandPageType="WEB_PAGE_TYPE_BROWSE"|
"WEB_PAGE_TYPE_CHANNEL"|
"WEB_PAGE_TYPE_PLAYLIST"|
"WEB_PAGE_TYPE_SHORTS"|
"WEB_PAGE_TYPE_WATCH"|
"WEB_PAGE_TYPE_SETTINGS"|
"WEB_PAGE_TYPE_UNKNOWN";