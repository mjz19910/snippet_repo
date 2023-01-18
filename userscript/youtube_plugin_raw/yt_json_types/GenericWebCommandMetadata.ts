type GetAddToPlaylistWebCommandMetadata={
	apiUrl: "/youtubei/v1/playlist/get_add_to_playlist";
};

type GetTranscriptWebCommandMetadata={
	apiUrl: "/youtubei/v1/get_transcript";
};

type GenericWebCommandMetadata=
|EditPlaylistWebCommandMetadata
|SearchApiWebCommandMetadata
|SetSettingWebCommandMetadata
|GetTranscriptWebCommandMetadata
|GetAddToPlaylistWebCommandMetadata
;