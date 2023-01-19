namespace GenericWebCommandMetadataNS {
	export type WCM="WebCommandMetadata";
}
type GenericWebCommandMetadata=
	|SearchWebCommandMetadata
	|GetTranscriptWebCommandMetadata
	|PlaylistWCM
	|AccountWCM
	|NextWebCommandMetadata
	|BrowseWCM
	|ShareWCM
	|NotificationWCM
	;
;type NotificationWCM=
|GetUnseenCountWebCommandMetadata
|GetNotificationMenuWebCommandMetadata
type ShareWCM=
|GetSharePanelWebCommandMetadata;
type AccountWCM=
|AccountMenuWebCommandMetadata
|SetSettingWebCommandMetadata
;
type PlaylistWCM=
|GetAddToPlaylistWebCommandMetadata;
type BrowseWCM=
|EditPlaylistWebCommandMetadata
|BrowseApiWebCommandMetadata
;