type PlaylistAddToOption={
	playlistId: PlaylistId;
	title: D$SimpleText;
	privacy: "PRIVATE"|"UNLISTED"|"PUBLIC";
	containsSelectedVideos: "NONE";
	privacyIcon: T$Icon<"PRIVACY_PRIVATE">;
	addToPlaylistServiceEndpoint: T$Endpoint<E$PlaylistEditEndpoint,{}>;
	removeFromPlaylistServiceEndpoint: T$Endpoint<E$PlaylistEditEndpoint,{}>;
	trackingParams: string;
};
