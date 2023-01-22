type PlaylistEditEndpoint={
	clickTrackingParams: string;
	commandMetadata: {
		webCommandMetadata: G$WC$Metadata$browse$edit_playlist;
	};
	playlistEditEndpoint: {
		playlistId: string;
		actions: ActionRemoveVideoByVideoId[];
	};
};
