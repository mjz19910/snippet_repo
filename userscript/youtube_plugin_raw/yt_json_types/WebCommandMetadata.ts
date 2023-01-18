type WebCommandMetadata=
	|BrowseWebCommandMetadata
	|ChannelWebCommandMetadata
	|EditPlaylistWebCommandMetadata
	|SearchApiWebCommandMetadata
	|WatchWebCommandMetadata
	|GenericWebCommandMetadata
	;
;
type GenericWebCommandMetadata={
	sendPost: boolean;
	apiUrl: Exclude<`/${ApiUrlFormat}`,SearchApiWebCommandMetadata['apiUrl']|EditPlaylistWebCommandMetadata['apiUrl']>;
};