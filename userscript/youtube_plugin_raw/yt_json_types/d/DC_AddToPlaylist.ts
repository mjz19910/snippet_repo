type DC_AddToPlaylist={
	listType: "PLAYLIST_EDIT_LIST_TYPE_QUEUE";
	onCreateListCommand: E_CreatePlaylistService;
	openListPanel?: boolean;
	openMiniplayer: boolean;
	videoId: string;
	videoIds: string[];
};