type VE23462_WebCommandMetadata={
	url: "/account"|`/account_${AccountPageSettingsSections}`;
	webPageType: "WEB_PAGE_TYPE_SETTINGS";
	rootVe: 23462;
	apiUrl: "/youtubei/v1/browse";
};

type SettingsWebCommandMetadata=VE23462_WebCommandMetadata;

type WebCommandMetadata=
	|GeneratedWebCommandMetadata
	|M$SendPost
	|WebCommandMetadataRVE
	;
;

type PlaylistWebCommandMetadata={
	url: "/playlist?list=WL"|"/playlist?list=LL";
	webPageType: "WEB_PAGE_TYPE_PLAYLIST";
	rootVe: 5754;
	apiUrl: "/youtubei/v1/browse";
};

type WebCommandMetadataRVE=
	|ChannelPageWebCommandMetadata
	|PlaylistWebCommandMetadata
	|VE4724_WebCommandMetadata
	|SettingsWebCommandMetadata
	|ShortsPageWebCommandMetadata
	|UnknownWebCommandMetadata
	|WatchPageWebCommandMetadata
	;
;