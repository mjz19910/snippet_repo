type D_PlaylistAddToOption={
	playlistId: PlaylistId;
	title: R_SimpleText;
	privacy: "PRIVATE"|"UNLISTED"|"PUBLIC";
	containsSelectedVideos: "NONE";
	privacyIcon: T_Icon<"PRIVACY_PRIVATE">;
	addToPlaylistServiceEndpoint: E_PlaylistEdit&TE_Endpoint<{}>;
	removeFromPlaylistServiceEndpoint: E_PlaylistEdit&TE_Endpoint<{}>;
	trackingParams: string;
};