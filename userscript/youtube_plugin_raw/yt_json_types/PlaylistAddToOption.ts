type PlaylistAddToOption={
	playlistId: PlaylistId;
	title: SimpleText;
	privacy: "PRIVATE"|"UNLISTED";
	containsSelectedVideos: "NONE";
	privacyIcon: Icon<"PRIVACY_PRIVATE">;
	addToPlaylistServiceEndpoint: PlaylistEditEndpoint;
	removeFromPlaylistServiceEndpoint: PlaylistEditEndpoint;
	trackingParams: string;
};
