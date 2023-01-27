type D_PlaylistAddToOption={
	playlistId: PlaylistId;
	title: R_SimpleText;
	privacy: "PRIVATE"|"UNLISTED"|"PUBLIC";
	containsSelectedVideos: "NONE";
	privacyIcon: T_Icon<"PRIVACY_PRIVATE">;
	addToPlaylistServiceEndpoint: E_PlaylistEdit&TE_Endpoint_Opt<{}>;
	removeFromPlaylistServiceEndpoint: E_PlaylistEdit&TE_Endpoint_Opt<{}>;
	trackingParams: string;
};