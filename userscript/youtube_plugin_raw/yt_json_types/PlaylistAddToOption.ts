type PlaylistAddToOption={
	playlistId: PlaylistId;
	title: SimpleText;
	privacy: "PRIVATE"|"UNLISTED"|"PUBLIC";
	containsSelectedVideos: "NONE";
	privacyIcon: Icon<"PRIVACY_PRIVATE">;
	addToPlaylistServiceEndpoint: PlaylistEditEndpoint;
	removeFromPlaylistServiceEndpoint: PlaylistEditEndpoint;
	trackingParams: string;
};
