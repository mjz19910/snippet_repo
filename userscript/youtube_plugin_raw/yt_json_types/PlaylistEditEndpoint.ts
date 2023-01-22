type PlaylistEditEndpoint={
	clickTrackingParams: string;
	commandMetadata: {
		webCommandMetadata: GM_browse_edit_playlist;
	};
	playlistEditEndpoint: {
		playlistId: "WL";
		actions: ActionRemoveVideoByVideoId[];
	};
};