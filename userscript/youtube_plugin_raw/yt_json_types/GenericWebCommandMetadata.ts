type GenericWebCommandMetadata=
	|EditPlaylistWebCommandMetadata
	|SearchApiWebCommandMetadata
	|SetSettingWebCommandMetadata
	|GetTranscriptWebCommandMetadata
	|GetAddToPlaylistWebCommandMetadata
	|AccountMenuWebCommandMetadata
	;
;type AccountMenuWebCommandMetadata={
	sendPost: true;
	apiUrl: "/youtubei/v1/account/account_menu";
};