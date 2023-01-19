type SettingsWebCommandMetadata={
	url: "/account";
	webPageType: "WEB_PAGE_TYPE_SETTINGS";
	rootVe: 23462;
	apiUrl: "/youtubei/v1/browse";
};

type WebCommandMetadata=
	|GenericWebCommandMetadata
	|PostWebCommandMetadata
	|WebCommandMetadataRVE
	;
;

type WebCommandMetadataRVE=
	|SettingsWebCommandMetadata
	|UnknownWebCommandMetadata
	|BrowsePageWebCommandMetadata
	|ChannelPageWebCommandMetadata
	|SearchPageWebCommandMetadata
	|WatchPageWebCommandMetadata
	|ShortsPageWebCommandMetadata
	;
;