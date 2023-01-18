type GenericWebCommandMetadata=
	|EditPlaylistWebCommandMetadata
	|SearchApiWebCommandMetadata
	|SetSettingWebCommandMetadata
	|GetTranscriptWebCommandMetadata
	|GetAddToPlaylistWebCommandMetadata
	|AccountMenuWebCommandMetadata
	|NextWebCommandMetadata
	|BrowseApiWebCommandMetadata
	;
;type BrowseApiWebCommandMetadata={
	sendPost: true;
	apiUrl: "/youtubei/v1/browse";
}