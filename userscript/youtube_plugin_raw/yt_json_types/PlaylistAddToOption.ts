type PlaylistAddToOption={
	playlistId: PlaylistId;
	title: SimpleText;
	privacy: "PRIVATE"|"UNLISTED"|"PUBLIC";
	containsSelectedVideos: "NONE";
	privacyIcon: Icon<"PRIVACY_PRIVATE">;
	addToPlaylistServiceEndpoint: EndpointTemplate<E_PlaylistEditEndpoint>;
	removeFromPlaylistServiceEndpoint: EndpointTemplate<E_PlaylistEditEndpoint>;
	trackingParams: string;
};
