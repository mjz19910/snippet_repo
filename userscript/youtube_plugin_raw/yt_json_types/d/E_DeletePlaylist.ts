type E_PlaylistDelete={
	clickTrackingParams: string;
	commandMetadata: M_PlaylistDelete;
	deletePlaylistEndpoint: DE_PlaylistDelete;
};
type M_PlaylistDelete={webCommandMetadata: GM_PlaylistDelete;};
type GM_PlaylistDelete={sendPost: true; apiUrl: "/youtubei/v1/playlist/delete";};
type DE_PlaylistDelete={playlistId: SD_PlaylistId;};
