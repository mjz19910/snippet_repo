type PlaylistAddToOption={
	playlistId: PlaylistId;
	title: SimpleText;
	privacy: "PRIVATE";
	containsSelectedVideos: "NONE";
	privacyIcon: Icon<"PRIVACY_PRIVATE">;
	addToPlaylistServiceEndpoint: PlaylistEditEndpoint;
	removeFromPlaylistServiceEndpoint: PlaylistEditEndpoint;
	trackingParams: string;
};
