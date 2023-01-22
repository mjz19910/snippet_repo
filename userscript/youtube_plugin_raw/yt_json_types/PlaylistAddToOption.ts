type D__PlaylistAddToOption={
	playlistId: PlaylistId;
	title: R_SimpleText;
	privacy: "PRIVATE"|"UNLISTED"|"PUBLIC";
	containsSelectedVideos: "NONE";
	privacyIcon: T_Icon<"PRIVACY_PRIVATE">;
	addToPlaylistServiceEndpoint: T$Endpoint<E_PlaylistEdit,{}>;
	removeFromPlaylistServiceEndpoint: T$Endpoint<E_PlaylistEdit,{}>;
	trackingParams: string;
};