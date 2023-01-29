type D_PlaylistAddToOption={
	playlistId: PlaylistId;
	title: D_Text;
	privacy: "PRIVATE"|"UNLISTED"|"PUBLIC";
	containsSelectedVideos: "NONE";
	privacyIcon: T_Icon<"PRIVACY_PRIVATE">;
	addToPlaylistServiceEndpoint: E_PlaylistEdit;
	removeFromPlaylistServiceEndpoint: E_PlaylistEdit;
	trackingParams: string;
};