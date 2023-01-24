type DC_AddToPlaylist={
	listType: string;
	onCreateListCommand: E_CreatePlaylistService;
	openListPanel: boolean;
	openMiniplayer: boolean;
	videoId: string;
	videoIds: string[];
};