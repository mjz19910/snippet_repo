type VE23462_WebCommandMetadata={
	url: "/account";
	webPageType: "WEB_PAGE_TYPE_SETTINGS";
	rootVe: 23462;
	apiUrl: "/youtubei/v1/browse";
};

type SettingsWebCommandMetadata=VE23462_WebCommandMetadata;

type WebCommandMetadata=
	|GenericWebCommandMetadata
	|PostWebCommandMetadata
	|WebCommandMetadataRVE
	;
;

type WebCommandMetadataRVE=
	|BrowsePageWebCommandMetadata
	|ChannelPageWebCommandMetadata
	|SearchPageWebCommandMetadata
	|SettingsWebCommandMetadata
	|ShortsPageWebCommandMetadata
	|UnknownWebCommandMetadata
	|WatchPageWebCommandMetadata
	;
;