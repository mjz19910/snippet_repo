type D_PlaylistAddToOption={
	playlistId: PlaylistId;
	title: R_SimpleText;
	privacy: "PRIVATE"|"UNLISTED"|"PUBLIC";
	containsSelectedVideos: "NONE";
	privacyIcon: T_Icon<"PRIVACY_PRIVATE">;
	addToPlaylistServiceEndpoint: E_PlaylistEdit&T_Endpoint<{}>;
	removeFromPlaylistServiceEndpoint: E_PlaylistEdit&T_Endpoint<{}>;
	trackingParams: string;
};