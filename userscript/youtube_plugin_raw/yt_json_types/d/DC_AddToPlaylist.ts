type DC_AddToPlaylist={
	listType: string;
	onCreateListCommand: SE_CreatePlaylist;
	openListPanel: boolean;
	openMiniplayer: boolean;
	videoId: string;
	videoIds: string[];
};