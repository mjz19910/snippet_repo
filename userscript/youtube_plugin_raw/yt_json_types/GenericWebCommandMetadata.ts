type GenericWebCommandMetadata=
	|EditPlaylistWebCommandMetadata
	|SearchApiWebCommandMetadata
	|SetSettingWebCommandMetadata
	|GetTranscriptWebCommandMetadata
	|GetAddToPlaylistWebCommandMetadata
	|AccountMenuWebCommandMetadata
	|NextWebCommandMetadata
	|BrowseApiWebCommandMetadata
	|GetSharePanelWebCommandMetadata
	|{
		sendPost: true;
		apiUrl: "/youtubei/v1/notification/get_notification_menu"
	}
	;
;