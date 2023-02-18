type E_DeletePlaylist={
	clickTrackingParams: string;
	commandMetadata: M_playlist_delete;
	deletePlaylistEndpoint: D_PlaylistId;
};
type M_playlist_delete={webCommandMetadata: GM_playlist_delete;};
type GM_playlist_delete={sendPost: true; apiUrl: "/youtubei/v1/playlist/delete";};
