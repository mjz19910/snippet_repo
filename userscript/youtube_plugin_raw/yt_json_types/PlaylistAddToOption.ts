type PlaylistAddToOption={
	playlistId: PlaylistId;
	title: SimpleText;
	privacy: "PRIVATE"|"UNLISTED"|"PUBLIC";
	containsSelectedVideos: "NONE";
	privacyIcon: Icon<"PRIVACY_PRIVATE">;
	addToPlaylistServiceEndpoint: EndpointTemplate<E$PlaylistEditEndpoint>;
	removeFromPlaylistServiceEndpoint: EndpointTemplate<E$PlaylistEditEndpoint>;
	trackingParams: string;
};
